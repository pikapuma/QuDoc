# Qu的成员 

!!! info
    所有的`Qu`的成员全部为公有，可以直接访问。
 

 
=== "实数标量"
    ##`data`
    <t-int>int</t-int>

    以32位整形实际存储的数据。
    !!! Warning
        - 请不要直接折腾`data`，除非你知道自己在干什么。
        - 无论是否要求了符号位，`data`都是有符号的。
    
    <hr>
  
    
    ##`toDouble()`
    <t-double>double</t-double>

    返回实际代表的double值。
    !!! Example
        ``` cpp
        Qu<intBits<2>, fracBits<2>, isSigned<true>> a = 0.92;
        std::cout << a.toDouble() << std::endl;
        ```
        输出：
        ```
        0.75
        ```
    <hr>

    ##`toString()`
    <t-default>std::string</t-default>

    返回比特串的字符串表示。


    <hr>
    ##<code>fill(<t-void></t-void><t-default>dis</t-default><t-int>int</t-int>)</code>
    <t-qu>Qu</t-qu>

    将`Qu`填充为指定的值。将会返回`*this`，以便链式调用。
    === "<t-void></t-void>"
        无参数时，将会填充可能范围内的随机均匀分布。
        !!! Example
            ``` cpp
            Qu<> a;
            a.fill();
            ```
    === "<t-default>dis</t-default>"
        可以传入一个分布，将会填充为分布的值。

        `QuBLAS.h`中预设了`UniRand`和`NormRand`两个分布。
        !!! Example
            ``` cpp
            Qu<> a;
            a.fill(NormRand);

            Qu<> b;
            b.fill(UniRand);

            Qu<> c;
            std::normal_distribution<double> myDis(1, 2);
            c.fill(myDis);
            ```
    === "<t-int>int</t-int>"
        传入一个整数，将会填充为这个整数。

        这里推荐使用二进制字面量，可以更直观的看到填充的值。
        !!! Example
            ``` cpp
            Qu<> a;
            a.fill(0b1010);
            a.display();
            ```
            输出：
            ```
            intBits: 8 fracBits: 8 isSigned: 1 Static
            Binary: 00000000000001010
            Binary 32: 00000000000000000000000000001010
            Hex: a
            Decimal: 0.0390625
            ```

    <hr>
    ##`display()`
    <t-void></t-void>

    打印debug信息。
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

    <hr>
    ##`operator <<`
    <t-default>ofstream</t-default>

    重载`<<`运算符，用于输出到流。将会输出实际代表的toDouble()值。
    !!! Example
        ``` cpp
        Qu<intBits<2>, fracBits<2>, isSigned<true>> a = 0.92;
        std::cout << a << std::endl;
        ```
        输出：
        ```
        0.75
        ```

    <hr>
    ##<code>operator = <t-default>Any</t-default></code>
    <t-qu>Qu</t-qu>

    重载`=`运算符，用于赋值。可以从`Qu`赋值给`Qu`，也可以从任意实数类型赋值给`Qu`，比如`int`、`double`等。

    当然了虽然说是"Any", 但是别整烂活传点奇怪的东西进去。

    需要注意的是，来自同样配置的`Qu`时会直接拷贝`data`，而来自不同配置的`Qu`时会进行转换，此时将会进行量化和溢出判断。


     
 
=== "复数标量"
    大部分成员和实数标量一样。

    ##`real`
    <t-qu>Qu</t-qu>

    实部。

    <hr>
    ##`imag`
    <t-qu>Qu</t-qu>

    虚部。

    <hr>
    ##<code>fill(<t-void></t-void><t-default>dis</t-default><t-int>int</t-int>)</code>
    <t-qu>Qu</t-qu>

    将复数填充为指定的值。将会对实部和虚部分别调用`fill()`。


=== "张量"
    ##`size`
    <t-type>dim<N...\></t-type>

    张量的大小。需要注意的是，这是一个`dim<N...>`类型，不是一个值。

    <hr>
    ##`data`
    <t-qu>std::array<Qu, N\> </t-qu>

    以`std::array`存储的数据。其中`N`为张量的大小。可以通过`size::elemSize`获取元素个数。

    <hr>
    ##<code> operator [<t-int>size_t</t-int> ...]</code>
    <t-qu>Qu</t-qu>

    重载`[]`运算符，用于访问张量的元素。

    具有两种重载形式：索引数量等于维度，或者索引仅为一个。

    === "<t-int>size_t</t-int> ..."
        索引数量等于维度时，就是取出对应坐标的元素。

        !!! Example
            ``` cpp
            Qu<dim<2,2>, Qu<>> mat = {1, 2, 3, 4};
            std::cout << mat[0][1] << std::endl;
            ```

            输出：
            ```
            2
            ```

    === "<t-int>size_t</t-int>"
        索引数量为单个索引时，是直接对`data`进行索引。

        这等效与`data[index]`。也就是Matlab中的单索引操作。

        !!! Example
            ``` cpp
            Qu<dim<2,2>, Qu<>> mat = {1, 2, 3, 4};
            std::cout << mat[2] << std::endl;
            ```
            输出：
            ```
            3
            ```

    <hr>
    ##`display()`
    <t-void></t-void>

    打印debug信息。效果为对每个元素调用`display()`。

    <hr>
    ##`clear()`
    <t-void></t-void>

    将张量清零。

    <hr>
    ##<code> fill(<t-void></t-void><t-default>dis</t-default><t-int>int</t-int>)</code>
    <t-qu>Qu</t-qu>

    将张量填充为指定的值。

    和实数标量的`fill()`一样，只是这里是对每个元素都调用一次`fill()`。

    <hr>
    ##`shuffle()`
    <t-qu>Qu</t-qu>

    将张量打乱。将会返回`*this`，以便链式调用。

    <hr>
    ##`toDouble()`
    <t-double>std::array<double, N\></t-double>


    返回一个`std::array<double, N>`，其中`N`为张量的大小。每个元素都是对应元素的`toDouble()`值。

    <hr>
    ##<code>operator = <t-default>Any</t-default></code>
    <t-qu>Qu</t-qu>

    重载`=`运算符，用于从任何来源赋值。

    要求来源是一个可以被方括号索引的类型，比如`std::array`、`std::vector`或者另一个`Qu`张量。

    运行的过程是对范围为`0 : size::elemSize`的每个`i`调用来源的`[i]`索引，然后赋值给对应的元素。

    !!! Warning
        请自行确保来源的大小和张量的大小一致，不会进行检查。

    !!! Example
        ``` cpp
        Qu<dim<2,2>, Qu<>> mat;
        std::array<double, 4> arr = {1, 2, 3, 4};
        mat = arr;
        
        std::vector<double> vec = {1, 2, 3, 4};
        mat = vec;

        mat = {1, 2, 3, 4};
        ```

    <hr>
    ##‘operator <<’
    <t-default>ofstream</t-default>

    重载`<<`运算符，用于输出到流。不同于`toDouble()`，这里的打印会尽可能地保持一个工整的格式。

    !!! Example
        ``` cpp
        Qu<dim<2,2>, Qu<>> mat = {1, 2, 3, 4};
        std::cout << mat << std::endl;
        ```
        输出：
        ```
        [1.0000, 3.0000
         2.0000, 4.0000]
        ```
         

 

 
