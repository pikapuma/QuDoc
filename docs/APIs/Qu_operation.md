# Qu的运算
<hr>

## <code><span>Qadd</span><T...\>(<t-qu>Qu</t-qu>, <t-qu>Qu</t-qu>)</code> <br> <code><span>Qmul</span><T...\>(<t-qu>Qu</t-qu>, <t-qu>Qu</t-qu>)</code> <br> <code><span>Qsub</span><T...\>(<t-qu>Qu</t-qu>, <t-qu>Qu</t-qu>)</code> <br> <code><span>Qdiv</span><T...\>(<t-qu>Qu</t-qu>, <t-qu>Qu</t-qu>)</code> 

<t-qu>Qu</t-qu>



基础加减乘除运算。输入参数为两个<t-qu>Qu</t-qu>。

这里的<t-qu>Qu</t-qu>可以是任何<t-qu>Qu</t-qu>类型，标量、张量、复数等都可以。

`T...`指的是一系列的tag，用于配置这个运算的一些特殊性质。具体的tag见各自的介绍。


<hr>

## <code><span>Qadd</span><T...\>(<t-qu>Qu</t-qu>, <t-qu>Qu</t-qu>)</code> 

<t-qu>Qu</t-qu>

加法。


=== "实数"
    - 允许的tag配置格式包括：
        1. 传入一个定义好的<t-qu>Qu</t-qu>类型
        2. 传入任意数量的基础tag如`intBits<>`、`fracBits<>`等，不足时会自动推导
 

    !!! Example
        ``` cpp
        using type1 = Qu<>;
        using type2 = Qu<intBits<3>, fracBits<4>>;

        type1 a = 0.5;
        type2 b = 0.5;

        auto c = Qadd(a, b);                           // 全部自动推导
        auto d = Qadd<intBits<3>, fracBits<4>>(a, b);  // 仅使用基础tag
        auto e = Qadd<type1>(a, b);                    // 使用已经定义好的Qu类型
    
        ```
=== "复数"

    - 允许的tag配置格式包括：
        - 传入任意数量的基础tag如`intBits`、`fracBits`等，不足时会自动推导，将同时用于实部和虚部
        - 传入一个定义好的<t-qu>Qu</t-qu>类型，将同时用于实部和虚部
        - 连续传入两个定义好的<t-qu>Qu</t-qu>类型，第一个用于实部，第二个用于虚部
        - 使用`realT<>`和`imagT<>`进行实部和虚部的配置。被包裹在`realT<>`和`imagT<>`中的tag将会被用于对应的部分。
 

    !!! Example
        ``` cpp
        using type1 = Qu<>;
        using type2 = Qu<intBits<3>, fracBits<4>>;
        using complex_t = Qu<type1, type2>;

        complex_t a = {0.5, 0.5};
        type1 b = 0.5;
        complex_t c = {0.5, 0.5};

        auto d = Qadd(a, b);                                 // 实部虚部都自动推导
        auto e = Qadd<intBits<3>, fracBits<4>>(a, c);        // 实部虚部都使用intBits<3>, fracBits<4>
        auto f = Qadd<type1>(a, c);                          // 实部虚部都使用type1
        auto g = Qadd<type1, type2>(a, c);                   // 实部使用type1，虚部使用type2
        auto h = Qadd<realT<type1>, imagT<type2>>(a, c);     // 实部使用type1，虚部使用type2
        auto i = Qadd<realT<type1>>(a, c);                   // 实部使用type1，虚部自动推导
        auto j = Qadd<imagT<fracBits<5>>>(a, c);             // 实部自动推导，虚部使用fracBits<5>，其余自动推导

        ```
=== "张量"
    当输入任意一个输入为张量时，将会执行逐元素加法。此时传入的任意tag将会被广播到每一个元素的加法中。

    允许输入情况为两个尺寸相同的张量，或者一个标量和一个张量。

    !!! Warning
        不支持不同尺寸的张量进行计算。完整的广播功能有待实现。

    !!! Example
        ``` cpp
        using type1 = Qu<>;
        using type2 = Qu<intBits<3>, fracBits<4>>;
        using complex_t = Qu<type1, type2>;
        using vec_t = Qu<dim<3>, complex_t>;

        vec_t a = {0.5, 0.5, 0.5};
        type1 b = 0.5;
        vec_t c;
        c.fill();

        auto d = Qadd<type1> (a, b);            // 广播b到a的每一个元素
        auto e = Qadd<realT<type1>>(a, b);      // a和c进行逐元素加法，实部使用type1，虚部自动推导
        ```

<hr>

## <code><span>Qmul</span><T...\>(<t-qu>Qu</t-qu>, <t-qu>Qu</t-qu>)</code>

<t-qu>Qu</t-qu>

乘法。

=== "实数 - 实数"
    - 允许的tag配置格式包括：
        1. 传入一个定义好的<t-qu>Qu</t-qu>类型
        2. 传入任意数量的基础tag如`intBits<>`、`fracBits<>`等，不足时会自动推导

    !!! Example
        ``` cpp
        using type1 = Qu<>;
        using type2 = Qu<intBits<3>, fracBits<4>>;

        type1 a = 0.5;
        type2 b = 0.5;

        auto c = Qmul(a, b);                           // 全部自动推导
        auto d = Qmul<intBits<3>, fracBits<4>>(a, b);  // 仅使用基础tag
        auto e = Qmul<type1>(a, b);                    // 使用已经定义好的Qu类型
    
        ```
=== "实数 - 复数"
    - 允许的tag配置格式包括：
        - 传入任意数量的基础tag如`intBits<>`、`fracBits<>`等，不足时会自动推导，将同时用于实部和虚部
        - 传入一个定义好的<t-qu>Qu</t-qu>类型，将同时用于实部和虚部
        - 连续传入两个定义好的<t-qu>Qu</t-qu>类型，第一个用于实部，第二个用于虚部
        - 使用`realT<>`和`imagT<>`进行实部和虚部的配置。被包裹在`realT<>`和`imagT<>`中的tag将会被用于对应的部分。

    !!! Example
        ``` cpp
        using type1 = Qu<>;
        using type2 = Qu<intBits<3>, fracBits<4>>;
        using complex_t = Qu<type1, type2>;

        complex_t a = {0.5, 0.5};
        type1 b = 0.5;
        complex_t c = {0.5, 0.5};

        auto d = Qmul(a, b);                                 // 实部虚部都自动推导
        auto e = Qmul<intBits<3>, fracBits<4>>(a, c);        // 实部虚部都使用intBits<3>, fracBits<4>
        auto f = Qmul<type1>(a, c);                          // 实部虚部都使用type1
        auto g = Qmul<type1, type2>(a, c);                   // 实部使用type1，虚部使用type2
        auto h = Qmul<realT<type1>, imagT<type2>>(a, c);     // 实部使用type1，虚部使用type2
        auto i = Qmul<realT<type1>>(a, c);                   // 实部使用type1，虚部自动推导
        auto j = Qmul<imagT<fracBits<5>>>(a, c);             // 实部自动推导，虚部使用fracBits<5>，其余自动推导

        ```
=== "复数 - 复数"
    复数 - 复数的乘法有两种计算方法，分别为基础乘法和TF乘法。需要用各自的tag进行配置。

    === "基础乘法"
        也就是标准的需要4次乘法和2次加法的计算。
        
        ```
        x = a + bi, y = c + di

        xy = (ac - bd) + (ad + bc)i
        ```

        - 需要使用标签`BasicComplexMul<>`进行配置。允许传入6个标签,具体的配置如下：
            - `acT<>`：传入的所有tag将会用于计算ac的乘法。
            - `bdT<>`：传入的所有tag将会用于计算bd的乘法。
            - `adT<>`：传入的所有tag将会用于计算ad的乘法。
            - `bcT<>`：传入的所有tag将会用于计算bc的乘法。
            - `acbdT<>`：传入的所有tag将会用于计算ac - bd的减法。
            - `adbcT<>`：传入的所有tag将会用于计算ad + bc的加法。
        - 可以直接在`BasicComplexMul<>`内部传入一个<t-qu>Qu</t-qu>类型，或者任意数量的基础tag。此时这些tag将会被用于所有的计算。

        
        !!! Example
            ``` cpp
            Qu<Qu<>, Qu<>> a = {1, 2};
            Qu<Qu<>, Qu<>> b = {3, 4};

            using type = Qu<>;

            auto c = Qmul<
                        BasicComplexMul<
                            acT<type>,                       // 使用定义好的类型进行配置
                            bdT<intBits<3>, fracBits<4>>,    // 使用基础tag直接配置
                            // adT<type>,                    // 不进行配置，ad乘法将自动推导
                            bcT<type>,
                            acbdT<type>,
                            adbcT<type>
                            >
                        >(a, b);

            auto d = Qmul<
                        BasicComplexMul<type>               // type将会用于全部4次乘法和2次加法
                        >(a, b);

            auto e = Qmul<
                        BasicComplexMul<
                            intBits<3>, fracBits<4>         // 这里的tag将会用于全部4次乘法和2次加法
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

        - 使用标签`TFComplexMu<>`进行配置。允许传入8个标签，分别对应:
            - `abT<>`：传入的所有tag将会用于计算a + b的乘法。
            - `cdT<>`：传入的所有tag将会用于计算c + d的乘法。
            - `baT<>`：传入的所有tag将会用于计算b - a的减法。
            - `abcT<>`：传入的所有tag将会用于计算(a + b)c的乘法。
            - `cdbT<>`：传入的所有tag将会用于计算(c + d)b的乘法。
            - `badT<>`：传入的所有tag将会用于计算(b − a)d的乘法。
            - `ABT<>`：传入的所有tag将会用于计算A - B的减法。
            - `BCT<>`：传入的所有tag将会用于计算B - C的减法。
        - 可以直接在`TFComplexMul<>`内部传入一个<t-qu>Qu</t-qu>类型，或者任意数量的基础tag。此时这些tag将会被用于所有的计算。


        !!! Example
            ``` cpp
            Qu<Qu<>, Qu<>> a = {1, 2};
            Qu<Qu<>, Qu<>> b = {3, 4};

            using type = Qu<>;

            auto c = Qmul<
                        TFComplexMul<
                            abT<type> ,                      // 使用定义好的类型进行配置
                            cdT<intBits<3>, fracBits<4>>,    // 使用基础tag直接配置
                            // baT<type>,                    // 不进行配置，ba减法将自动推导
                            abcT<type>,
                            cdbT<type>,
                            badT<type>,
                            ABT<type>,
                            BCT<type>
                            >
                        >(a, b);

            auto d = Qmul<
                        TFComplexMul<type>                 // type将会用于全部3次乘法和5次加法
                        >(a, b);
            
            auto e = Qmul<
                        TFComplexMul<
                            intBits<3>, fracBits<4>         // 这里的tag将会用于全部3次乘法和5次加法
                            >
                        >(a, b);
            ```
=== "张量"
    当输入任意一个输入为张量时，将会执行逐元素乘法。此时传入的任意tag将会被广播到每一个元素的乘法中。

    允许输入情况为两个尺寸相同的张量，或者一个标量和一个张量。

    !!! Warning
        不支持不同尺寸的张量进行计算。完整的广播功能有待实现。

    !!! Example
        ``` cpp
        using type1 = Qu<>;
        using type2 = Qu<intBits<3>, fracBits<4>>;
        using complex_t = Qu<type1, type2>;
        using vec_t = Qu<dim<3>, complex_t>;

        vec_t a = {0.5, 0.5, 0.5};
        type1 b = 0.5;
        vec_t c;
        c.fill();

        auto d = Qmul<type1> (a, b);                        // 广播b到a的每一个元素
        auto e = Qmul<realT<type1>>(a, b);                  // a和c进行逐元素乘法，实部使用type1，虚部自动推导
        auto f = Qmul<realT<type1>, imagT<type2>>(a, c);    // a和c进行逐元素乘法，实部使用type1，虚部使用type2
        auto g = Qmul<
                    BasicComplexMul<
                        acT<type1>, bdT<type2>, adT<type1>, bcT<type2>, acbdT<type1>, adbcT<type1>
                        >
                    >(c, c);                                // c和c进行逐元素乘法，使用BasicComplexMul进行配置
        ```
 
<hr>

## <code><span>Qsub</span><T...\>(<t-qu>Qu</t-qu>, <t-qu>Qu</t-qu>)</code>

<t-qu>Qu</t-qu>

减法。

=== "实数"
    - 允许的tag配置格式包括：
        1. 传入一个定义好的<t-qu>Qu</t-qu>类型
        2. 传入任意数量的基础tag如`intBits<>`、`fracBits<>`等，不足时会自动推导

    !!! Example
        ``` cpp
        using type1 = Qu<>;
        using type2 = Qu<intBits<3>, fracBits<4>>;

        type1 a = 0.5;
        type2 b = 0.5;

        auto c = Qsub(a, b);                           // 全部自动推导
        auto d = Qsub<intBits<3>, fracBits<4>>(a, b);  // 仅使用基础tag
        auto e = Qsub<type1>(a, b);                    // 使用已经定义好的Qu类型
    
        ```
=== "复数"
    - 允许的tag配置格式包括：
        - 传入任意数量的基础tag如`intBits<>`、`fracBits<>`等，不足时会自动推导，将同时用于实部和虚部
        - 传入一个定义好的<t-qu>Qu</t-qu>类型，将同时用于实部和虚部
        - 连续传入两个定义好的<t-qu>Qu</t-qu>类型，第一个用于实部，第二个用于虚部
        - 使用`realT<>`和`imagT<>`进行实部和虚部的配置。被包裹在`realT<>`和`imagT<>`中的tag将会被用于对应的部分。

    !!! Example
        ``` cpp
        using type1 = Qu<>;
        using type2 = Qu<intBits<3>, fracBits<4>>;
        using complex_t = Qu<type1, type2>;

        complex_t a = {0.5, 0.5};
        type1 b = 0.5;
        complex_t c = {0.5, 0.5};

        auto d = Qsub(a, b);                                 // 实部虚部都自动推导
        auto e = Qsub<intBits<3>, fracBits<4>>(a, c);        // 实部虚部都使用intBits<3>, fracBits<4>
        auto f = Qsub<type1>(a, c);                          // 实部虚部都使用type1
        auto g = Qsub<type1, type2>(a, c);                   // 实部使用type1，虚部使用type2
        auto h = Qsub<realT<type1>, imagT<type2>>(a, c);     // 实部使用type1，虚部使用type2
        auto i = Qsub<realT<type1>>(a, c);                   // 实部使用type1，虚部自动推导
        auto j = Qsub<imagT<fracBits<5>>>(a, c);             // 实部自动推导，虚部使用fracBits<5
    
        ``` 
=== "张量"
    当输入任意一个输入为张量时，将会执行逐元素减法。此时传入的任意tag将会被广播到每一个元素的减法中。

    允许输入情况为两个尺寸相同的张量，或者一个标量和一个张量。

    !!! Warning
        不支持不同尺寸的张量进行计算。完整的广播功能有待实现。

    !!! Example
        ``` cpp
        using type1 = Qu<>;
        using type2 = Qu<intBits<3>, fracBits<4>>;
        using complex_t = Qu<type1, type2>;
        using vec_t = Qu<dim<3>, complex_t>;

        vec_t a = {0.5, 0.5, 0.5};
        type1 b = 0.5;
        vec_t c;
        c.fill();

        auto d = Qsub<type1> (a, b);                        // 广播b到a的每一个元素
        auto e = Qsub<realT<type1>>(a, b);                  // a和c进行逐元素减法，实部使用type1，虚部自动推导
        auto f = Qsub<realT<type1>, imagT<type2>>(a, c);    // a和c进行逐元素减法，实部使用type1，虚部使用type2
        auto g = Qsub<
                    BasicComplexMul<
                        acT<type1>, bdT<type2>, adT<type1>, bcT<type2>, acbdT<type1>, adbcT<type1>
                        >
                    >(c, c);                                // c和c进行逐元素减法，使用BasicComplexMul进行配置
        ```
<hr>

## <code><span>Qdiv</span><T...\>(<t-qu>Qu</t-qu>, <t-qu>Qu</t-qu>)</code>

<t-qu>Qu</t-qu>

除法。

!!! Warning
    - 由于除法的特殊性，在你使用除法前请确保你和硬件方面的人员讨论过。
    - 在出现除以0的情况时，将会直接返回0。

=== "实数"
    - 允许的tag配置格式包括：
        1. 传入一个定义好的<t-qu>Qu</t-qu>类型
        2. 传入任意数量的基础tag如`intBits<>`、`fracBits<>`等，不足时会自动推导

    !!! Example
        ``` cpp
        using type1 = Qu<>;
        using type2 = Qu<intBits<3>, fracBits<4>>;

        type1 a = 0.5;
        type2 b = 0.5;

        auto c = Qdiv(a, b);                           // 全部自动推导
        auto d = Qdiv<intBits<3>, fracBits<4>>(a, b);  // 仅使用基础tag
        auto e = Qdiv<type1>(a, b);                    // 使用已经定义好的Qu类型
    
        ```
=== "复数"
    - 允许的tag配置格式包括：
        - 传入任意数量的基础tag如`intBits<>`、`fracBits<>`等，不足时会自动推导，将同时用于实部和虚部
        - 传入一个定义好的<t-qu>Qu</t-qu>类型，将同时用于实部和虚部
        - 连续传入两个定义好的<t-qu>Qu</t-qu>类型，第一个用于实部，第二个用于虚部
        - 使用`realT<>`和`imagT<>`进行实部和虚部的配置。被包裹在`realT<>`和`imagT<>`中的tag将会被用于对应的部分。

    !!! Warning
        除数仅支持实数，不支持复数。
    
    !!! Example
        ``` cpp
        using type1 = Qu<>;
        using type2 = Qu<intBits<3>, fracBits<4>>;
        using complex_t = Qu<type1, type2>;

        complex_t a = {0.5, 0.5};
        type1 b = 0.5;

        auto d = Qdiv(a, b);                                 // 实部虚部都自动推导
        auto e = Qdiv<intBits<3>, fracBits<4>>(a, b);        // 实部虚部都使用intBits<3>, fracBits<4>
        auto f = Qdiv<type1>(a, b);                          // 实部虚部都使用type1
        auto g = Qdiv<type1, type2>(a, b);                   // 实部使用type1，虚部使用type2
        auto h = Qdiv<realT<type1>, imagT<type2>>(a, b);     // 实部使用type1，虚部使用type2
        auto i = Qdiv<realT<type1>>(a, b);                   // 实部使用type1，虚部自动推导
        auto j = Qdiv<imagT<fracBits<5>>>(a, b);             // 实部自动推导，虚部使用fracBits<5>，其余自动推导
    
        ```
=== "张量"
    当输入任意一个输入为张量时，将会执行逐元素除法。此时传入的任意tag将会被广播到每一个元素的除法中。

    允许输入情况为两个尺寸相同的张量，或者一个标量和一个张量。

    !!! Warning
        不支持不同尺寸的张量进行计算。完整的广播功能有待实现。

    !!! Example
        ``` cpp
        using type1 = Qu<>;
        using type2 = Qu<intBits<3>, fracBits<4>>;
        using complex_t = Qu<type1, type2>;
        using vec_t = Qu<dim<3>, complex_t>;

        vec_t a = {0.5, 0.5, 0.5};
        type1 b = 0.5;
        vec_t c;
        c.fill();

        auto d = Qdiv<type1> (a, b);                        // 广播b到a的每一个元素
        auto e = Qdiv<realT<type1>>(a, b);                  // a和c进行逐元素除法，实部使用type1，虚部自动推导
        auto f = Qdiv<realT<type1>, imagT<type2>>(a, c);    // a和c进行逐元素除法，实部使用type1，虚部使用type2
        auto g = Qdiv<
                    BasicComplexMul<
                        acT<type1>, bdT<type2>, adT<type1>, bcT<type2>, acbdT<type1>, adbcT<type1>
                        >
                    >(c, c);                                // c和c进行逐元素除法，使用BasicComplexMul进行配置
        ```

<hr>
## <code>Qreduce<T...\>(<t-qu>Qu</t-qu>)</code>
<t-qu>Qu</t-qu>

`Qreduce`用于算一个张量的所有元素的和。

实现的方法为树形加法。可以传入任意数量的tag，用于配置每一层的加法。


=== "均匀加法"
    如果仅传入一个类型，则内部全部使用这个类型进行加法。
    
    !!! Example
        ``` cpp
        using type = Qu<>;
        Qu<dim<2, 2>, type> mat = {1, 2, 3, 4};

        auto sum = Qreduce<type>(mat);
        ```
=== "分层配置"
    可以直接传入多个type，或者传入一个`TypeList`，用于配置每一层的加法。
    !!! Example
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
    !!! Example

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


<hr>

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