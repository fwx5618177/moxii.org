# 前端富文本编辑器关于 OP 与 CRDT 的总结

# 绪论

国内的富文本资料很少，而且研究这方面的人也很少。或许是我研究和探索不够，一叶障目，对外界主流缺乏认知。在研究 Appflowy、分布式系统后，暂将富文本的协同核心点列出来对比。

# OP 与 CRDT

富文本的 OP（Operation Transformation）算法和 CRDT（Conflict-free Replicated Data Type）都是用于实现多用户实时协作编辑的技术，但它们有一些不同之处。

1. Operation Transformation (OP) 算法:

   - OP 算法是一种用于实现协作编辑的技术，它可以处理多个用户并发编辑同一个文档的情况。
   - OP 算法将用户的编辑操作转换成操作序列，并在共享的文档上应用这些操作序列，以实现数据同步和一致性。
   - 当多个用户同时编辑文档时，可能会出现冲突，OP 算法会对这些冲突进行解决，并确保最终所有用户的文档状态是一致的。
   - OP 算法在处理冲突时，可能需要额外的服务器支持，例如中心化的服务器或 OT 服务器，以协调不同用户的编辑操作。

2. Conflict-free Replicated Data Type (CRDT):
   - CRDT 是一种用于实现分布式系统中数据同步的技术，它的设计目标是实现数据的最终一致性，解决多个副本之间的冲突问题。
   - CRDT 不需要中心化的服务器或 OT 算法来处理冲突，而是通过设计特定的数据结构和操作规则，确保在多个副本上应用相同的操作后，最终达成一致的数据状态。
   - CRDT 中的操作是可交换和可并发的，因此可以在不同副本之间进行同步，而不需要复杂的冲突解决算法。

区别：

- OP 算法主要用于处理协作编辑的情况，它需要额外的服务器支持来处理冲突和解决并发编辑问题。而 CRDT 是一种更通用的数据同步技术，可以应用于更广泛的分布式系统场景，不依赖于中心化的服务器和复杂的冲突解决算法。
- CRDT 采用了一种更简单的设计思路，通过约束数据结构和操作规则来确保最终一致性，而 OP 算法可能需要更复杂的实现和协调机制。

使用范畴和优劣：

- OP 算法适用于需要实现实时协作编辑的场景，如在线文档编辑、实时绘图工具等。它可以处理多用户并发编辑，但可能需要中心化服务器和复杂的冲突解决算法。
- CRDT 适用于更广泛的分布式系统场景，包括多副本数据库、实时协作应用、分布式存储等。它的设计更简单，不需要中心化服务器，并且可以在分布式系统中实现高度可用和最终一致性。
- 优劣：OP 算法在某些复杂情况下可能需要更复杂的实现和服务器支持，而 CRDT 的设计相对简单，更容易实现和部署。然而，CRDT 的一些特定场景下可能会有性能和存储上的开销。

目前在实际应用中，CRDT 技术得到了广泛的应用，特别是在分布式系统中实现数据同步和一致性。一些流行的 CRDT 数据类型包括 LWW-Element-Set、OR-Set、G-Counter、PN-Counter 等。而 OP 算法也在一些特定的协作编辑应用中得到了应用，但相对于 CRDT，在更广泛的分布式系统中使用较少。

## OP与OT的区别

富文本编辑中的"op"（操作）和"ot"（操作转换）算法都用于处理多用户协同编辑同一个文档的情况，但它们有不同的工作方式和应用场景。

**OT（Operation Transformation，操作转换）算法**：

- 基本概念：OT算法旨在解决协同编辑时的冲突问题。当多个用户同时编辑同一文档时，他们的编辑操作可能会发生冲突，OT算法的目标是找到一种方法来协调和合并这些操作，以确保所有用户看到的最终文档是一致的。

- 并发编辑处理：OT算法将用户的编辑操作称为"操作"，然后将这些操作应用到文档中。当多个操作冲突时，OT算法会执行一系列转换操作，以使冲突的操作成为一致的顺序。这样，文档可以保持一致，而不会出现意外的结果。

- 顺序敏感：OT算法是顺序敏感的，这意味着操作的顺序很重要。如果两个用户以不同的顺序应用相同的操作，结果可能会不同。

**OP（Operation-based，基于操作的）算法**：

- 基本概念：OP算法也用于解决协同编辑中的冲突问题，但它的工作方式略有不同。OP算法将每个用户的编辑操作称为"操作"，但不仅考虑操作的内容，还考虑操作的顺序和标识符等元信息。

- 元信息重要性：OP算法通过操作的元信息来解决冲突，而不仅仅是操作的内容。这包括操作的标识符、时间戳等信息，以确定操作的先后顺序。

- 可伸缩性：OP算法通常更适合处理大规模协同编辑，因为它不需要像OT算法那样频繁地执行转换操作。它可以处理更多的操作，而不会丧失性能。

**主要区别**：

1. 转换操作 vs. 元信息：OT算法侧重于转换操作，以解决冲突，而OP算法侧重于操作的元信息，以确定操作的顺序。

2. 顺序敏感性：OT算法是顺序敏感的，操作的顺序很重要。而OP算法通常较少关注操作的顺序，更注重操作的元信息。

3. 性能差异：OP算法通常在大规模协同编辑情景下具有更好的性能，因为它不需要频繁执行复杂的转换操作。OT算法可能在某些情况下更复杂，但在某些特定场景中也非常有用。

具体选择哪种算法取决于应用的需求和场景。某些情况下，OT算法可能更适合，而在其他情况下，OP算法可能更适合。一些协同编辑工具可能会综合使用这两种算法来处理不同类型的操作。


## 推荐框架-YJS

Yjs（Your data, Shared）是一个基于 CRDT 的开源分布式数据协作框架。它被设计用于在多个用户之间共享和协作编辑实时数据，例如文本文档、绘图、表格等。Yjs 使用 CRDT 技术来解决并发冲突，确保数据在多个用户之间同步和一致。

Yjs 提供了一种易于使用的数据同步模型，它允许开发者将其集成到各种应用中，实现多用户实时协作功能。Yjs 支持多种数据类型的同步，如文本、数组、Map、Set 等，并提供了一组操作和事件，开发者可以根据应用的需求来处理数据的变更和同步。