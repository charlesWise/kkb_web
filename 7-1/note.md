- jsx 其实是 babel 转义成 React.createElement 来执行，用来构建虚拟 dom
- 对于一个 dom 有非常多多属性，dom 操作一直是前端性能的杀手，我们用 js 对象来描述我们 dom，createElement 返回的就是虚拟 dom

<img src="./images/01.jpg" width="450" />
<img src="./images/02.jpg" width="450" />
<img src="./images/03.jpg" width="450" />
<img src="./images/04.jpg" width="450" />

#### requestIdleCallback

- Q：注意上面的 render，一旦开始就开始递归本身这个没啥问题，但是如果应用变得庞大就会卡顿，后面状态修改 diff 也是一样整个 vdom 对象变大后，diff 的过程也有会递归过多导致卡顿？
  * A：浏览器有哥 API requestIdleCallback 可以利用浏览器的业余时间，我们可以把任务分成一个个小的任务，然后利用浏览器空闲时间来 diff，如果当前又来任务，比如用户点击或者动画，会先执行然后空闲后再回去把 requestIdleCallback 没完成的任务完成。（类比火车，比如车厢干活休息我们记住上次干到那节车厢，下次回来继续干活）。

- fibers 我们有了调度逻辑，之前的 vdom 结构是一个树形结构，它的 diff 过程是没法中断的，为了管理我们 vdom 树之间关系，需要我们把树形结构的内部关系改成链表（方便终止）之前只是 children 作为一个数组递归遍历，现在父》子，子》父，子》兄，都有关系。整个任务从 render 开始，然后每次只遍历一个小单元，一旦被打断就会执行优先级高的任务（用户交互/动画）回来后，有余回来的元素知道父子兄元素，很容易恢复遍历状态。

- 提交 commit：我们给 dom 添加节点的时候，如果渲染的过程中被打断，ui 渲染会变得很奇怪，所以我们应该把 dom 操作独立出来，我们用一个全局变量来存储正在工作 fiber 根节点（workInprogress tree）

- Reconciliation：现在我们已经能渲染来，但是如何做更新和删除节点呢？
  * 我们需要保存一个被中断前工作的 fiber 节点 currentRoot，以及每个 fiber 都有一个字段存储这上一个状态的 fiber，（其实可以理解成子节点的更新、删除操作，diff算法）

- hooks 状态也就是state 实际上hooks是通过链表来查找具体state