# Qu

`Qu`为一切标量、向量、矩阵乃至张量的创建入口。

所有的`Qu`对象都通过 `Qu<T...>` 的形式来创建，其中`T...`为任意数量的配置标签。

## Qu的创建

### 标量
可选标签包括：

- `intBits<N>`：整数位宽，未指定时为8

- `fracBits<N>`：浮点数位宽，未指定时为8

- `isSigned<B>`：是否有符号，未指定时为True

- `QuMode<M>`：量化模式

- `OfMode<M>`：溢出模式

!!! Example

    ```cpp title="直接创建"
    Qu<intBits<8>, isSigned<true>> a = 1;     
    Qu<fracBits<8>> b = 0.5;
    ```
   
    ```cpp title="间接创建"
    using QuType = Qu<intBits<8>, isSigned<true>>;
    QuType a = 1;
    ```



### 张量

所有非标量的`Qu`对象都是张量。

张量的创建格式为`Qu<dim<N...>, T...>`，其中`dim<N...>`为张量的维度，`N...`为任意数量的维度。 

!!! Warning 
    - `dim<N...>` 必须为第一个配置标签。
    - 列优先存储。


 

!!! Example 

    ```cpp title="直接创建"
    Qu<dim<2, 3>, intBits<8>, isSigned<true>> a = {1, 2, 3, 4, 5, 6};
    ```
   
    ```cpp title="间接创建"
    using QuType = Qu<dim<2, 3>, intBits<8>, isSigned<true>>;
    using MatType = Qu<dim<2, 3>, QuType>;
    MatType a = {1, 2, 3, 4, 5, 6};
    ```

