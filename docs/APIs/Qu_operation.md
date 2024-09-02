# Qu的运算

## `FullPrec`

`FullPrec`是一个特殊的tag，用于传入某个计算函数，使得计算结果强制使用全精度。

这个tag可用于几乎所有计算。

!!! Warning
    很可能会导致需要的总比特超过31，谨慎使用。

!!! Example
    ``` cpp
    Qu<> a = 0.5;
    Qu<> b = 0.5;

    auto c = Qadd<FullPrec>(a, b);
    ```


<hr>


## <code><span>Qadd</span><T...\>(<t-qu>Qu</t-qu>, <t-qu>Qu</t-qu>)</code> <br> <code><span>Qmul</span><T...\>(<t-qu>Qu</t-qu>, <t-qu>Qu</t-qu>)</code> <br> <code><span>Qsub</span><T...\>(<t-qu>Qu</t-qu>, <t-qu>Qu</t-qu>)</code> <br> <code><span>Qdiv</span><T...\>(<t-qu>Qu</t-qu>, <t-qu>Qu</t-qu>)</code> 

<t-qu>Qu</t-qu>

基础加减乘除运算。

可以传入任意数量的tag进行配置，也可以传入已经创建好的`Qu`类型。

所有未被配置的tag将会自动根据尽量不产生量化溢出损失推导。

支持部分混合类型输入，比如 实数标量-复数标量、复数标量-张量等。

!!! warning
    === "混合类型限制"
        - 支持标量和张量进行计算。此时，标量将会被广播到张量的所有元素上。
        - 支持同尺寸的张量进行计算。
        - 不支持不同尺寸的张量进行计算。完整的广播功能有待实现。
    === "表达式计算"
        - 当你进行两个标量的计算时，会直接返回一个标量。也就是说，你可以使用`auto`接收结果。
        - 但是当你进行两个张量的计算时，返回的并不是一个张量，而是一个表达式。这意味着请勿使用`auto`接收结果，而应该使用`Qu`接收。除非你知道自己在干什么。

        !!! Example
            ``` cpp
            Qu<> a = 0.5;
            Qu<> b = 0.5;

            auto c = Qadd(a, b); // c是一个标量Qu

            Qu<dim<3>, Qu<>> vec1 = {1, 2, 3};
            Qu<dim<3>, Qu<>> vec2 = {4, 5, 6};

            Qu<dim<3>, Qu<>> vec3 = Qadd(vec1, vec2); // vec3是一个张量Qu
            auto vec4 = Qadd(vec1, vec2); // vec4是一个表达式，不是一个Qu !
            ``` 
        
        
<hr>
## <code><span>Qmul</span><T...\>(<t-qu>Qu</t-qu>, <t-qu>Qu</t-qu>)</code>  

<t-qu>Qu</t-qu>

乘法在复数计算中有一些特殊的处理。

=== "基础乘法"
    也就是标准的(a+bi)(c+di) = (ac-bd) + (ad+bc)i。总计需要4次乘法和2次加法。

    使用标签`BasicComplexMul`进行配置。允许传入6个标签，分别对应ac、bd、ad、bc、ac - bd、ad + bc的计算。
    




    !!! Example
        ``` cpp
        Qu<Qu<>, Qu<>> a = {1, 2};
        Qu<Qu<>, Qu<>> b = {3, 4};

        using type = Qu<>;

        auto c = Qmul<
                    BasicComplexMul<
                        acT<type>,
                        bdT<type>,
                        adT<type>,
                        bcT<type>,
                        acbdT<type>,
                        adbcT<type>
                        >
                    >(a, b);
        ```

=== "TF乘法"
    一种使用3次乘法和5次加法的乘法计算。
    
    ```
    x = a + bi, y = c + di

    A = (a + b)c, B = (c + d)b, C = (b − a)d

    xy = (A − B) + (B − C)i
    ```

    使用标签`TFComplexMul`进行配置。允许传入8个标签，分别对应a + b、 c + d、 b - a、 (a + b)c、 (c + d)b、 (b − a)d、 A - B、 B - C的计算。

    !!! Example
        ``` cpp
        Qu<Qu<>, Qu<>> a = {1, 2};
        Qu<Qu<>, Qu<>> b = {3, 4};

        using type = Qu<>;

        auto c = Qmul<
                    TFComplexMul<
                        abT<type>,
                        cdT<type>,
                        baT<type>,
                        abcT<type>,
                        cdbT<type>,
                        badT<type>,
                        ABT<type>,
                        BCT<type>
                        >
                    >(a, b);
        ```



<hr>
## <code>Qreduce<T...\>(<t-qu>Qu</t-qu>)</code>
<t-qu>Qu</t-qu>

`Qreduce`用于算一个张量的所有元素的和。

实现的方法为树形加法，`T...`部分可以对每一层的加法进行配置。

!!! Example
    === "均匀加法"
        如果仅传入一个类型，则内部全部使用这个类型进行加法。
        ``` cpp
        using type = Qu<>;
        Qu<dim<2, 2>, type> mat = {1, 2, 3, 4};

        auto sum = Qreduce<type>(mat);
        ```
    === "分层配置"
        可以直接传入多个type，或者传入一个`TypeList`，用于配置每一层的加法。
        ``` cpp
        using type1 = Qu<>;
        using type2 = Qu<fracBits<3>>;

        Qu<dim<2, 2>, type1> mat = {1, 2, 3, 4};

        auto sum1 = Qreduce<type1, type2>(mat);

        using typeList = TypeList<type1, type2>;

        auto sum2 = Qreduce<typeList>(mat);
        ```
    === "标量求和"
        可以在输入中传入任意数量的标量`Qu`，用于求和。


        ``` cpp

        Qu<> a = 1;
        Qu<> b = 2;
        Qu<> c = 3;

        auto sum = Qreduce(a, b, c);
        ```

        !!! warning
            这个版本存在一定的编译效率问题，不建议在大规模场景下使用。

<hr>
## <code>Qtable<T\>(<t-qu>Qu</t-qu>)</code>
<t-qu>Qu</t-qu>

`Qtable`用于实现查表。这个函数需要使用`ANUS::Qtable`来获取

只能用于标量。实际的实现为对输入的`Qu`的`toDouble()`结果进行查表，再量化为`Qu`。

`T`为一个函数。`QuBLAS.h`中预设了三个函数，分别为`sqrtFunc`, `reciprocalFunc`, `rsqrtFunc`，分别对应开方、倒数、倒数开方。

!!! Example
    ``` cpp
    Qu<> a = 0.5;

    auto b = Qtable<sqrtFunc>(a);

    // custom function
    inline static constexpr auto myFunc = [](double x) { return x * x; };

    auto c = Qtable<myFunc>(a);
    ```
