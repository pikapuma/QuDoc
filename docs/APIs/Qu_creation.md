# Qu的创建

`Qu`为一切标量、向量、矩阵乃至张量的创建入口。

所有的`Qu`对象都通过 `Qu<T...>` 的形式来创建，其中`T...`为任意数量的配置标签。

<hr>


## 实数标量
可选标签包括：

<!-- - `intBits<N>`：整数位宽，可以为负数，未指定时为8

- `fracBits<N>`：小数位宽，可以为负数，未指定时为8

- `isSigned<B>`：是否有符号，未指定时为True

- `QuMode<M>`：量化模式，有待补充

- `OfMode<M>`：溢出模式，有待补充 -->

 

| 标签         | 可选值   | 描述                              |
| ------------ | -------- | --------------------------------- |
| `intBits<>`  | `size_t` | 整数位宽，可以为负数，未指定时为8 |
| `fracBits<>` | `size_t` | 小数位宽，可以为负数，未指定时为8 |
| `isSigned<>` | `bool`   | 是否有符号，未指定时为True        |
| `QuMode<>`   | `enum`   | 量化模式，有待补充                |
| `OfMode<>`   | `enum`   | 溢出模式，有待补充                |

!!! Warning
    - `intBits`和`fracBits`的和必须小于等于31。更高的位宽尚未实现。

!!! Example
    === "直接创建"

        ``` cpp
        Qu<intBits<8>, isSigned<true>> a = 1;     
        Qu<fracBits<8>> b = 0.5;
        ```

    === "间接创建"

        ``` cpp
        using QuType = Qu<intBits<8>, isSigned<true>>;
        QuType a = 1;
        ```

<hr>

## 复数标量
需要传入两个实数标量类型，形如`Qu<Qu<T1...>, Qu<T2...>>`。

 
!!! Example
    === "直接创建"

        ``` cpp
        Qu<Qu<intBits<8>, isSigned<true>>, Qu<fracBits<8>>> a = {1, 0.5};
        ```

    === "间接创建"

        ``` cpp
        using QuType1 = Qu<intBits<8>, isSigned<true>>;
        using QuType2 = Qu<fracBits<8>>;
        Qu<QuType1, QuType2> a = {1, 0.5};
        ```
 

<hr>

## 张量

所有非标量的`Qu`对象都是张量。

张量的创建格式为`Qu<dim<N...>, T...>`，其中`dim<N...>`为张量的维度，`N...`为任意数量的维度。 




!!! Info annotate
    - `dim<N...>` 必须为第一个配置标签。
    - 列优先存储。 (1)     
    - `T...` 部分可以直接传入用于配置标量的标签，也可以传入已经创建好的`Qu`类型。


1. 如果你不了解列优先存储，可以理解为和Matlab一样。
 

 
 
!!! Example
    === "直接创建"

        ``` cpp
        Qu<dim<2, 3>, intBits<8>, isSigned<true>> a = {1, 2, 3, 4, 5, 6};
        ```

    === "间接创建"

        ``` cpp
        using QuType = Qu<intBits<8>, isSigned<true>>;
        using MatType = Qu<dim<2, 3>, QuType>;
        MatType a = {1, 2, 3, 4, 5, 6};
        ```
