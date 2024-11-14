'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import Document from '@tiptap/extension-document';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const text = `# 参考文献标准

在这里的部分我打算整理一下参考文献的格式，以及一些文献类型。最后还可以整理一下endnote里面的格式。

## 论文文献引用格式

主要的英文论文引用格式规范有APA，AMA，ACS，AMJ，**IEEE**，MLA，和Harvard Gatton。中文文献的引用格式看国标就行了。

* 【APA(6th edition)-美国心理学会(American Psychological Association)】
  * **适用范围**：**心理学**中使用的标准样式，但也广泛用于其他学科，尤其是**社会科学**。
  * **文章内的引用格式**：一般使用作者的姓氏和文章发表年份，句号放在括号外。
  * **文章内引用格式举例**：单个作者：xxxxx (Lowrie, 2009). 两个作者：xxxxx (Lowrie & Diezmann, 2009). 或 Lowrie and Diezmann (2009) have found that xxxxx
  * **参考文献格式**：作者姓, 作者名缩写. (发表年份). 文章题目*. 斜体期刊名称, 刊号,* 页码.
  * **参考文献格式举例**：Lowrie, T., & Diezmann, C. M. (2009). National numeracy tests: A graphic tells a thousand words. *Australian Journal of Education*,*53*, 141-158.
  * **参考文献列表**：参考文献无需编号，按作者姓氏字母顺序排列，使用悬挂缩进格式。
* 【AMA-美国医学会(American Medical Association)】
  * **适用范围**：广泛用于**医学**，尤其是在**美国医学会出版的期刊**中。
  * **文章内的引用格式**：在引用文字末尾右上角，按照出现方式标注阿拉伯数字。
  * **文章内引用格式举例**：上角标，数字
  * **参考文献格式**：作者姓 作者名缩写. 文章题目*. 斜体期刊名称.* 发表年份;刊号(发行号):页码.
  * **参考文献格式举例**：**1**. Rogers AB. Histologic scoring of gastritis and gastric cancer in mouse models. *Methods Mol Biol*. 2012;921:189-203.
  * **参考文献列表**：参考文献按文章内的出现顺序编号。
* 【ACS-美国化学学会(American Chemical Society)】
  * **适用范围**：广泛用于**化学**及相关学科。
  * **文章内的引用格式**：在引用文字末尾右上角，按照出现方式标注阿拉伯数字。
  * **文章内引用格式举例**：上角标，数字
  * **参考文献格式**：编号. 作者姓 作者名缩写. 文章题目*. 斜体期刊名称.* **加粗发表年份**,刊号, 页码.
  * **参考文献格式举例**：1. Klinger, J. Influence of Pretreatment on Sodium Powder.*Chem. Mater.***2005,***17*, 2755-2768.
  * **参考文献列表**：参考文献按文章内的出现顺序编号。
* 【AMJ-管理学术期刊(Academy of Management Journal style)】
  * **适用范围**：基于《**管理学院学报**》的风格指南。
  * **文章内的引用格式**：一般使用作者的姓氏和文章发表年份，句号放在括号外。
  * **文章内引用格式举例**：单个作者：xxxxx (Lowrie, 2009). 两个作者：xxxxx (Lowrie & Diezmann, 2009). 或 Lowrie and Diezmann (2009) have found that xxxxx
  * **参考文献格式**：作者姓, 作者名缩写. (发表年份). 文章题目*. **斜体加粗期刊名称**,* 刊号(发行号)*:*页码.
  * **参考文献格式举例**：Dorado, S. 2005. Institutional entrepreneurship, partaking, and convening. ***Organization Studies* **, 26: 385– 414.
* 【MLA(8th edition)-美国现代语言协会(Modern Language Association of America)】
  * **适用范围**：广泛用于**现代文学**和**语言学**领域。
  * **文章内的引用格式**：一般使用作者的姓氏和引用部分的页码，两个作者姓氏中使用and而非&进行连接，姓氏和页码中间无需逗号，句号放在括号外。
  * **文章内引用格式举例**：(Abellie and Borsley 1140) 或 Abellie and Borsley found that xxxxx (1140)
  * **参考文献格式**：作者姓, 作者名. “文章题目." *斜体期刊名称,* vol. 期刊号, no. 发行号, 发行年份, pp. 页码
  * **参考文献格式举例**：Abellie, Anne, and Robert D. Borsley. "Comparative Correlatives and Parameters." *Lingua*, vol. 118, no. 8, 2008, pp. 1139-57.
  * **参考文献列表**：参考文献无需编号，按作者姓氏字母顺序排列，使用悬挂缩进格式。
* **【IEEE-电气和电子工程师学会(Institute of Electrical and Electronics Engineers)】**
  * **适用范围**：广泛用于**电气工程和计算机科学**领域。
  * **文章内的引用格式**：参考文献不需要在文中引用，只需要阿拉伯数字代表。
  * **文章内引用格式举例**：as shown by Brown [4], [5]; as mentioned earlier [2], [4]–[7], [9]
  * **参考文献格式**：[编号]. 作者名缩写. 作者姓, "文章题目," presented at the 会议名, 城市, 洲, 国家, 月日, 年, 页码
  * **参考文献格式举例**：J. G. Kreifeldt, “An analysis of surface-detected EMG as an amplitude-modulated noise,” presented at the 1989 Int. Conf. Medicine and Biological Engineering, Chicago, IL, USA, Nov. 9–12, 1989.
  * **参考文献列表**：参考文献按文章内的出现顺序编号。
  
* 【Harvard Gatton-哈佛】
  * **适用范围**：主要用于**农业**和**食品科学**学科。
  * **文章内的引用格式**：一般使用作者的姓氏、文章发表年份和引用部分页码，句号放在括号外。
  * **文章内引用格式举例**：两个以上作者：‘xxxxx’ (Hawkins et al. 2006, p. 307). 或 Hawkins et al found xxxxx.
  * **参考文献格式**：作者姓, 作者名缩写 文章发表年份, ‘文章题目', *斜体期刊名称,* 刊号, 发行号, 页码.
  * **参考文献格式举例**：Hawkins, CE, Baars, C, Hesterman, H, Mooney, GJ & Jones, ME 2006, ‘Emerging disease and population decline of an island endemic, the Tasmanian devil*Sarcophilusharrisii*’,*Biological Conservation*, vol. 131, no. 2, pp. 307-24.
  * **参考文献列表**：参考文献无需编号，按作者姓氏字母顺序排列。



## 中文参考文献

中文参考文献，主要参考国家有关标准《文后参考文献著录规则》，这个标准是由国家标准化管理委员会制定并发布，经历了三版，从GB/T 7714-1987，到GB/T 7714-2005，再到GB/T 7714-2015。现在最新的是GB/T 7714-2015这一版，毕业论文中也需要符合这个标准。

### 编排格式及示例

* **期刊（journal）**：
  [序号]主要责任者.文献题名[J].刊名, 出版年份, 卷号(期号).起止页码.

  > [1] 何龄修. 读南明史[J]. 中国史研究, 1998, 6(3): 167-173.

* **专著（monograph）**：
  [序号]主要责任者.文献题名[M].出版地:出版者,出版年:起止页码.

  > [2] 刘国钧, 陈绍业, 王凤翥. 图书馆目录[M]. 北京: 高等教育出版社, 1957: 15-18.

* **会议论文集（collections）**：
  [序号]主要责任者. 文献题名[A]主编.论文集名[C].出版地:出版者,出版年:起止页码.

  > [3] 钟文发. 非线性规划在可燃毒物配置的应用[C]. 西安: 西安电子科技大学出版社, 1996: 468-471.

* **学位论文（dissertation）**：
  [序号]主要责任者.文献题名[D].出版地:出版单位,出版年:起止页码(可选).

  > [4] 马欢. 人类活动影响下海河流域典型区水循环变化分析[D]. 北京: 北京大学, 2011.

* **报告（report）**：
  [序号]主要责任者.文献题名[R].报告地:报告会主办单位,年份.

  > [5] 冯西桥.核反应堆压力管道与压力容器的LBB分析[R].北京：清华大学核能技术设计研究院，1997.

* **报纸文章**：
  [序号]主要责任者.文献题名[N].报纸名,出版日期(版次).

  > [6]谢希德. 创造学习的新思路[N]. 人民日报, 1998-12-25(10).

* **专利文献（patent）**：
  [序号]专利所有者.专利题名[P].专利国别:专利号,发布日期.

  > [7] 姜锡洲. 一种温热外敷药制备方案[P]. 中国专利: 881056073, 1989-07-26.

* **国际、国家标准**：
  [序号]标准代号,标准名称[S],出版地:出版者,出版年.

  > [8] GB/T16159-1996, 汉语拼音正词法基本规则[S].

* **电子文献**（[J/OL]网上期刊、[EB/OL]网上电子公告、[M/CD]光盘图书、[DB/OL]网上数据库、[DB/MT]磁带数据库）：
  [序号]主要责任者.电子文献题名[电子文献及载体类型标识].电子文献的出版或获得地址,发表更新日期/引用日期.

  > [12] 万锦堃.中国大学学报论文文摘（1983-1993）.英文版[DB/CD].北京：中国大百科全书出版社，19%.



### 格式要求

* 如果作者超过3位，那么作者只写到第3位，第4位和其后的作者用“等”代替。
* 参考文献的序号左顶格[1]，[2]，[3]，每一参考文献条目的最后均以“. ”结束，这里的标点符号“,”和 “:” 和“.”都统一用半角，半角符号后面要空一格。
* 括号用半角。
* 有些中文文章年代比较久远，没有卷，只有期，那么这里的卷就省略不写。



## 英文参考文献

### 编排格式及示例

* **专著、论文集、学位论文、报告**：
  [序号]主要责任者。文献题名。出版地：出版者，出版年。起止页码(任选)

  > [1] Day,C.,Veen,D.van,& Walraven,G. Children and youth at risk and urban education. Research,policy and prac-tice. Leuven/Apeldoorn:Garant. 1997.

* **期刊文章**：
  [序号]主要责任者。文献题名。刊名，年，卷(期)：起止页码

  > [2] Driessen,G.,& Van der Grinten,M. Home language proficiency in the Netherland:The evaluation of Turkish andMoroccan bilingual programmes- A critical review,Studies in Educational Evaluation,1994,20(3)：365- 386.

* **论文集中的析出文献**：

  [序号]析出文献主要责任者。析出文献题名。原文献主要责任者(任选)。原文献题名。出版地：出版者，出版年。析出文献起止页码

  > [3] Driessen, G., Mulder, L., &  Jungbluth,P. Structural and cultural determinants of educational opportunities in the Netherlands. In S.Weil(Ed.)，Root and migration in global perspective. Jerusalem:Magnes Press.1999. pp.83- 104.[5]

* **报纸文章**：

  [序号]主要责任者。文献题名。报纸名，出版日期(版次)

  > [4] Lgnatieff, M. Keeping an old flame burning brightly. The Guardian,1998-12-20(12)

* **电子文献**：

  [序号]主要责任者。电子文献题名。电子文献的出处或可获得的地址，发表或更新日期

  > [5] Baboescu, F. Algorithms for fast packet classification.

### 格式要求





## EndNote Reference

### 格式要求

让我迷惑：

* 英文名字姓是全大写吗，我看到有的只是首字母大写，名需要缩写吗，我也看到有的没写。`;

export function AppEditor() {
    const editor = useEditor({
        extensions: [Document, StarterKit],
        content: text,
        editorProps: {
            attributes: {
                class: 'max-w-[800px] focus:outline-none'
            }
        }
    });

    return (
        <ScrollArea className="h-full w-full">
            <EditorContent
                editor={editor}
                className="flex justify-center p-16 pt-2"
            />
        </ScrollArea>
    );
}
