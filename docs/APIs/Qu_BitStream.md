# BitStream函数
<hr>

#### <code><span>std::string Bitstream</span><<t-qu>elemProcessT</t-qu>>(<t-qu>Qu</t-qu><T...\> const&); </code>  <br> <code><span>ResultT Bitstream</span><<t-qu>ResultT</t-qu>, <t-qu>elemProcessT</t-qu>>(std::string const&); </code> <br> <code><span>std::string Bitstream</span><<t-qu>tensorProcessT</t-qu>, <t-qu>elemProcessT</t-qu>>(<t-qu>Qu</t-qu><T...\> const&); </code> <br> <code><span>ResultT Bitstream</span><<t-qu>ResultT</t-qu>, <t-qu>tensorProcessT</t-qu>, <t-qu>elemProcessT</t-qu>>(std::string const&);</code>

`BitStream()`函数实现`Qu`对象与`std::string`的相互转换，其中`elemProcessT`指定按何种顺序处理每个标量元素，`tensorProcessT`指定按何种顺序读取张量的元素（不能在输入为标量类型`Qu`时使用），`ResultT`为转换的结果类型（即`Qu<...>`类型，只能在输入为字符串时使用）。


### `tensorProcessT`

测试：

| 标签         | 可选值   | 描述                              |
| ------------ | -------- | --------------------------------- |
| `intBits<>`  | `size_t` | 整数位宽，可以为负数，未指定时为8 |
| `fracBits<>` | `size_t` | 小数位宽，可以为负数，未指定时为8 |
| `isSigned<>` | `bool`   | 是否有符号，未指定时为True        |
| `QuMode<>`   | `enum`   | 量化模式，有待补充                |
| `OfMode<>`   | `enum`   | 溢出模式，有待补充                |

从以下标签中选择一个：

| 标签     | 可选值    | 描述 |
| -------- | -------- | -------------------------------------------------------- |
| `l2r`    | `/`      | 按从左至右的顺序读取输入的元素 |
| `r2l<N>` | `size_t` | 将输入的元素分成几组，每组`N`个元素。从右至左读取每组。每组内顺序仍是从左至右 |

### `elemProcessT`

从以下标签中选择一个：    

| 标签     | 可选值   | 描述 |
| -------- | -------- |------------------------------------------------------ |
| `l2r`    | `/`      | 按从左至右的顺序实现`Qu`标量与字符串的转换 |
| `r2l<N>` | `size_t` | 将`Qu`标量或字符串分成几组，每组`N`个元素，从右至左读取每组。每组内顺序仍是从左至右 |

!!! Info 字符串格式
    - 从`Qu`转换到`std::string`，结果中可能会含有一些表示格式（张量，复数等）的符号（见示例）。
    - 从`std::string`转换到`Qu`，会忽略输入的字符串中除`'0'`和`'1'`之外的字符。
  
!!! Warning
    - 使用`Bitstream()`函数需要编程者自行保证转换是合理的。例如，不能把一个长度为6的字符串`"000111"`转换为元素个数为2，单个元素位宽为6的张量`Qu<dim<2>, isSigned<true>, intBits<5>, fracBits<0>>`类型（源字符串位数不够）；不能以`elemProcessT = r2l<5>`的方式将一个`Qu<isSigned<true>, intBits<11>, fracBits<0>>`的`Qu`变量转化为字符串（`Qu`变量的长度12无法被5整除）。
    - 不合理转换的结果未定义，可能抛出异常或得到错误结果。

!!! Example
    #### 将`2*3`的二维张量v逆序（`tensorProcessT = r2l<1>`）转化为字符串，再将字符串转换为元素为复数的一维张量`Qu<T...>`

    ``` cpp
    using fixed_type = Qu<intBits<5>, fracBits<0>>;
    using vec_type = Qu<dim<2, 3>, fixed_type>;
    using complex_vec_type = Qu<dim<3>, Qcomplex<fixed_type, fixed_type>>;
    vec_type v = {1, 2, 3, 4, 5, 6};

    std::string v_res = BitStream<r2l<1>, l2r>(v);
    std::cout << v_res << '\n';

    auto z = BitStream<complex_vec_type, l2r, l2r>(v_res);
    std::cout << z << "\n";
    ```

    输出：
    `000110000101000100000011000010000001`
    `[(6.0000,5.0000), (4.0000,3.0000), (2.0000,1.0000)]`

测试：

| 标签         | 可选值   | 描述                              |
| ------------ | -------- | --------------------------------- |
| `intBits<>`  | `size_t` | 整数位宽，可以为负数，未指定时为8 |
| `fracBits<>` | `size_t` | 小数位宽，可以为负数，未指定时为8 |
| `isSigned<>` | `bool`   | 是否有符号，未指定时为True        |
| `QuMode<>`   | `enum`   | 量化模式，有待补充                |
| `OfMode<>`   | `enum`   | 溢出模式，有待补充                |