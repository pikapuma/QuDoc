# Qu的成员

所有的`Qu`的成员全部为公有，可以直接访问。


 

 
=== "实数标量"
    ##`data`
    <t-constexpr></t-constexpr> <t-int></t-int>

    :  以32位整形实际存储的数据。
        !!! info
            - 请不要直接折腾`data`，除非你知道自己在干什么。
            - 无论是否要求了符号位，`data`都是有符号的。

    ##`display()`
    <t-void></t-void>

    :  打印debug信息。
        !!! Example
            ``` cpp
            Qu<intBits<8>, isSigned<true>> a = 1;
            a.display();
            ```
            输出：
            ```
            intBits: 8 fracBits: 12 isSigned: 1 Static
            Binary: 000000001000000000000
            Binary 32: 00000000000000000001000000000000
            Hex: 1000
            Decimal: 1
            ```

    ##`operator <<`
    <t-default>ofstream</t-default>

    :  重载`<<`运算符，用于输出到流。将会输出实际代表的double值。
        !!! Example
            ``` cpp
            Qu<intBits<2>, fracBits<2>, isSigned<true>> a = 0.92;
            std::cout << a << std::endl;
            ```
            输出：
            ```
            0.75
            ```


     
 
=== "复数标量"
    - 222222
  
=== "张量"