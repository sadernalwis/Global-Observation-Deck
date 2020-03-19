using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Core : MonoBehaviour
{

    string getPressedKey()
    {
        if (Input.GetKeyDown(KeyCode.A)) { return "a"; }
        if (Input.GetKeyDown(KeyCode.B)) { return "b"; }
        if (Input.GetKeyDown(KeyCode.C)) { return "c"; }
        if (Input.GetKeyDown(KeyCode.D)) { return "d"; }
        if (Input.GetKeyDown(KeyCode.E)) { return "e"; }
        if (Input.GetKeyDown(KeyCode.F)) { return "f"; }
        if (Input.GetKeyDown(KeyCode.G)) { return "g"; }
        if (Input.GetKeyDown(KeyCode.H)) { return "h"; }
        if (Input.GetKeyDown(KeyCode.I)) { return "i"; }
        if (Input.GetKeyDown(KeyCode.J)) { return "j"; }
        if (Input.GetKeyDown(KeyCode.K)) { return "k"; }
        if (Input.GetKeyDown(KeyCode.L)) { return "l"; }
        if (Input.GetKeyDown(KeyCode.M)) { return "m"; }
        if (Input.GetKeyDown(KeyCode.N)) { return "n"; }
        if (Input.GetKeyDown(KeyCode.O)) { return "o"; }
        if (Input.GetKeyDown(KeyCode.P)) { return "p"; }
        if (Input.GetKeyDown(KeyCode.Q)) { return "q"; }
        if (Input.GetKeyDown(KeyCode.R)) { return "r"; }
        if (Input.GetKeyDown(KeyCode.S)) { return "s"; }
        if (Input.GetKeyDown(KeyCode.T)) { return "t"; }
        if (Input.GetKeyDown(KeyCode.U)) { return "u"; }
        if (Input.GetKeyDown(KeyCode.V)) { return "v"; }
        if (Input.GetKeyDown(KeyCode.W)) { return "w"; }
        if (Input.GetKeyDown(KeyCode.X)) { return "x"; }
        if (Input.GetKeyDown(KeyCode.Y)) { return "y"; }
        if (Input.GetKeyDown(KeyCode.Z)) { return "z"; }
        if (Input.GetKeyDown(KeyCode.Space)) { return " "; }
        if (Input.GetKeyDown(KeyCode.KeypadEnter)) { return "."; }
        if (Input.GetKeyDown(KeyCode.Backspace)) { return "-"; }
        return "";

    }

    // Update is called once per frame
    string ss = "";
    
    bool firstexecution = true;
    bool cscreated = false;
    
    CrimsonString cs;
    CrimsonList csl;
    
    void Update(){

        if (firstexecution){

            int i = ss.Length;
            ss += getPressedKey();
            if (ss.Length > i)
            {
                if (cscreated)
                {
                    {
                        //cs.destroy();

                        csl.destroy();

                        Debug.Log("came here");

                    }

                }
            }
            char[] cc = ss.ToCharArray();
            if (cc.Length > 0 && cc[cc.Length - 1] == '.') {
                Debug.Log(ss);
                firstexecution = false;
                Origin tempo = csl.childrenBase.Clone().Dimension(2).Previous(13);
                Origin on = new Origin(tempo.X, tempo.Y, tempo.Z);
                list = createCrimsonList(on, getCdatafromHeader(ss));
            }

            if (ss.Length > i)
            {
                Origin tori = new Origin(0.0f, 0.0f, 0.0f, 3.0f);
                //cs = new CrimsonString(ss, new Origin(0.0f, 0.0f, 0.0f, 3.0f), 20);
                csl = new CrimsonList(tori, 3.0f, 1.0f, 20);
                csl.AddCrimsonString(ss);
                cscreated = true;
                Debug.Log("did it come here?");

            }
            if (cc.Length > 0 && cc[cc.Length - 1] == '-') { ss = ss.Substring(0, ss.Length - 2); }

        }



        if (Input.GetKeyDown(KeyCode.LeftControl))
        {
            Start();
        }
        else if (Input.GetKeyDown(KeyCode.UpArrow))
        {
            list.Next(-1);
            switchLists();
            secondexecution = true;
        }
        else if (Input.GetKeyDown(KeyCode.DownArrow))
        {
            list.Next(1);
            switchLists();

            secondexecution = true;
        }
        else if (secondexecution && Input.GetKeyDown(KeyCode.KeypadEnter))
        {
            list = temporarylist;
            movetochild();
        }

    }
    bool secondexecution = false;

    public void switchLists() {
        temporarylist.destroy();
        Origin tempo = list.childrenBase.Clone().Dimension(1).PrecisionSteps(3.0f).Next(14).Dimension(2).Previous(13);//Dimension(2).PrecisionSteps(1.0f).Previous(13).Dimension(1).Next(list.maximumtextlength*10);
        Origin on = new Origin(tempo.X, tempo.Y, tempo.Z);
        temporarylist = createCrimsonList(on, getCdatafromHeader(list.GetSelectedCrimsonString().TextContent));

    }

    public void movetochild() {


        Origin tempo = list.childrenBase.Clone().Dimension(1).PrecisionSteps(3.0f).Next(14).Dimension(2).Previous(13);//Dimension(2).PrecisionSteps(1.0f).Previous(13).Dimension(1).Next(list.maximumtextlength*10);
        Origin on = new Origin(tempo.X, tempo.Y, tempo.Z);
        temporarylist = createCrimsonList(on, getCdatafromHeader(list.GetSelectedCrimsonString().TextContent));
    }
    



    CrimsonData crimsondataset;
    public string[] getCdatafromHeader(string header) {
        string[] st = crimsondataset.getCrimsonList(header);
        return st;
    }

    public CrimsonList createCrimsonList(Origin ori,string[] cdata) {
        CrimsonList cl = new CrimsonList(ori, 3.0f, 1.0f, 20);
        for (int i = 0; i < cdata.Length; i++) {
            cl.AddCrimsonString(cdata[i]);
        }
        return cl;
    }

    // Use this for initialization
    CrimsonList list;
    CrimsonList temporarylist;
    public CrimsonList ListChild;
    public List<CrimsonList> ParentsList;


    void Start()
    {

        crimsondataset = new CrimsonData();
        temporarylist = new CrimsonList(new Origin(110.0f, 0.0f, 0.0f), 2.0f, 1.0f, 20);

        //list = new CrimsonList(new Origin(110.0f, 0.0f, 0.0f), 3.0f, 1.0f, 20);
        //list.AddCrimsonString("asdfasf");
        //list.AddCrimsonString("humuhm");
        //list.AddCrimsonString("uyb");
        //list.AddCrimsonString("asdfasf");
        //list.AddCrimsonString("humuhm");
        //list.AddCrimsonString("uyb");
        //list.AddCrimsonString("uyb");
        //list.AddCrimsonString("asdfasf");
        //list.AddCrimsonString("humuhm");
        //list.AddCrimsonString("uyb");





    }



    //public class CrimsonIndex
    //{

    //    public CrimsonIndex(CrimsonData crimdata)
    //    {


    //    }

    //}

    
    public class CrimsonList
    {
        public CrimsonString Parent;
        public List<CrimsonString> Children;

        private List<CrimsonString> AllStringsList;

        public Origin Base;
        public Origin childrenBase;
        public State defaultState;
        public float ParentPrecision;
        public float ChildPrecision;
        public int maximumtextlength;

        public int SelectedCrimsonStringIndex;



        public Origin getAttachNode()
        {
            //if (this.AllStringsList.Count ==1)
            //{
            //    return this.AllStringsList[0].Base.Clone().Dimension(3).Next(maximumtextlength);
            //}
            //if (this.AllStringsList.Count > 1)
            //{

            //    return this.AllStringsList[1].Base.Clone().Dimension(3).Next(maximumtextlength);
            //}
            //return this.AllStringsList[0].Base.Clone().Dimension(3).Next(maximumtextlength+2);
            return childrenBase;
            
        }



        public void destroy()
        {
        //    Parent.destroy();
        //    for (int i = 0; i < Children.Count; i++)
        //    {
        //        Children[i].destroy();
        //    }
            for (int i = 0; i < AllStringsList.Count; i++)
            {
                AllStringsList[i].destroy();
            }

            
        }

        public CrimsonList(Origin ori, float pp, float cp, int textlimit)
        {
            Base = new Origin(ori.X, ori.Y, ori.Z, pp);
            //childrenBase = ori.PrecisionSteps(pp).Dimension(2).Next(13).Clone();
            childrenBase = ori;

            ParentPrecision = pp;
            ChildPrecision = cp;

            Children = new List<CrimsonString>();
            AllStringsList = new List<CrimsonString>();

            //defaultState = dfState;
            maximumtextlength = textlimit;
        }

        public int AddCrimsonString(string cstext)
        {
            if (AllStringsList.Count < 1)
            {
                //CrimsonString pcrst = new CrimsonString(cstext, Base.Dimension(2).PrecisionSteps(ParentPrecision).Previous(13).Dimension(3));
                CrimsonString ParentCS = new CrimsonString(cstext, Base, cstext.Length);

                ParentCS.setDefaultState(new State(State.DarkestRed, State.White));
                ParentCS.setSelectedState(new State(State.Red, State.Black));

                Parent = ParentCS;
                AllStringsList.Add(Parent);

                SelectedCrimsonStringIndex = 0;

                this.Select(SelectedCrimsonStringIndex);
                //AllStringsList[SelectedCrimsonStringIndex].Select(new State(State.Red, State.White));
            }
            else {

                CrimsonString ChildCS = new CrimsonString(cstext, childrenBase.Dimension(2).PrecisionSteps(ChildPrecision).Previous(13 + (13 * Children.Count)).Dimension(1), maximumtextlength);
                childrenBase.BackToCreation();

                ChildCS.setDefaultState(new State(State.DarkRed, State.Grey));
                ChildCS.setSelectedState(new State(State.White, State.Red));

                AllStringsList.Add(ChildCS);
                Children.Add(ChildCS);

                SelectedCrimsonStringIndex = AllStringsList.Count - 1;
                this.Select(SelectedCrimsonStringIndex);
                //AllStringsList[SelectedCrimsonStringIndex].Select(new State(State.Red, State.White));



            }
            return AllStringsList.Count;

        }

        public CrimsonString GetSelectedCrimsonString()
        {
            return this.AllStringsList[SelectedCrimsonStringIndex];

        }

        public void Select(int indexOfCrst)
        {
            for (int i = 0; i < AllStringsList.Count; i++)
            {
                if (i == indexOfCrst)
                {
                    AllStringsList[i].Select();
                    SelectedCrimsonStringIndex = i;
                }
                else
                {
                    AllStringsList[i].Deselect();

                }

            }
        }

        public Origin Next(int amount)
        {

            int newIndex = SelectedCrimsonStringIndex + amount;
            if (newIndex < 0)
            {
                newIndex = AllStringsList.Count - 1;
            }
            else if (newIndex > AllStringsList.Count - 1)
            {
                newIndex = 0;
            }

            print(newIndex + "/" + AllStringsList.Count + "/" + SelectedCrimsonStringIndex);
            Select(newIndex);
            return AllStringsList[newIndex].Base.Clone();

        }



    }

    public class State
    {
        public static string DarkRed = "DarkRed";
        public static string DarkestRed = "DarkRed";
        public static string Red = "Red";
        public static string White = "White";
        public static string Black = "Black";
        public static string Grey = "Grey";
        public static string LightGrey = "LightGrey";
        public string Foreground;
        public string Background;
        public State(string fg, string bg)
        {
            Foreground = fg;
            Background = bg;

        }
    }


    public class CrimsonString
    {
        public GameObject gameObject;
        public GameObject Background;
        public Mesh mesh;
        public Origin Base;
        private char[] Symbols;
        public string TextContent;
        public int[] Triangles;
        public Vector3[] Vertices;

        int symbolLimit;

        public CrimsonString(string symbols, Origin origin, int limit)
        {
            symbolLimit = limit;
            TextContent = symbols;

            setDefaultState(new State(State.Red, State.White));
            setSelectedState(new State(State.DarkRed, State.Grey));

            Base = new Origin(origin.X, origin.Y, origin.Z);
            Base.precision = origin.precision;

            if (symbols.Length > symbolLimit)
            {
                Symbols = symbols.Substring(0, symbolLimit).ToCharArray();

            }
            else if (symbols.Length < symbolLimit)
            {
                Symbols = symbols.PadRight(symbolLimit, ' ').ToCharArray();
            }
            else {
                Symbols = symbols.ToCharArray();
            }


            List<Vector3> temporaryVectorList = new List<Vector3>();
            List<int> temporaryTrianglesList = new List<int>();

            for (int chari = 0; chari < Symbols.Length; chari++)
            {
                int[] abstractTriangles = CharacterTris(Symbols[chari]);
                for (int i = 0; i < abstractTriangles.Length; i++)
                {
                    temporaryVectorList.Add(origin.Dimension(1).Next(abstractTriangles[i] % 10).Dimension(2).Next(abstractTriangles[i] / 10).GetVector3());
                    temporaryTrianglesList.Add(temporaryTrianglesList.Count);
                    origin.X = Base.X;
                    origin.Y = Base.Y;
                    origin.Z = Base.Z;
                }

                Base.Dimension(1).Next(6);
                origin.X = Base.X;
                origin.Y = Base.Y;
                origin.Z = Base.Z;
            }


            Base.BackToCreation();
            gameObject = new GameObject();
            Render(gameObject, ListToArray(temporaryVectorList), ListToArray(temporaryTrianglesList));
            Background = new GameObject();
            //CreateBackground(Base,1, (6 * Symbols.Length)+5, 2,12);
            CreateBackground(Base, 1, (6 * symbolLimit) + 5, 2, 12);

        }

        public void destroy()
        {
            Destroy(Background);
            Destroy(gameObject);
        }



        private void Render(GameObject go, Vector3[] vertices, int[] tris)
        {

            mesh = new Mesh();
            MeshFilter meshFilter = go.AddComponent<MeshFilter>();
            MeshRenderer meshRenderer = go.AddComponent<MeshRenderer>();
            mesh.vertices = vertices;
            mesh.triangles = tris;
            go.GetComponent<MeshFilter>().mesh = mesh;
        }

        private void CreateBackground(Origin ori, int dim1, int amount1, int dim2, int amount2)
        {
            Vector3[] verts = new Vector3[4];
            ori.Dimension(3).Next(1);
            verts[0] = ori.GetVector3();
            verts[1] = ori.Dimension(dim1).Next(amount1).GetVector3();
            verts[2] = ori.Dimension(dim2).Next(amount2).GetVector3();
            verts[3] = ori.Dimension(dim1).ReverseDirection().Next(amount1).GetVector3();

            int[] trians = new int[] { 2, 1, 0,
                                       3, 2, 0};

            Render(Background, verts, trians);



        }

        public int[] ListToArray(List<int> list)
        {
            int[] tarray = new int[list.Count];
            for (int i = 0; i < list.Count; i++)
            {
                tarray[i] = list[i];
            }
            return tarray;
        }

        public Vector3[] ListToArray(List<Vector3> list)
        {
            Vector3[] tarray = new Vector3[list.Count];
            for (int i = 0; i < list.Count; i++)
            {
                tarray[i] = list[i];
            }
            return tarray;
        }
        Material[] mats;
        public void ChangeMaterial(State state)
        {


            gameObject.GetComponent<Renderer>().material = GameObject.Find(state.Foreground).GetComponent<Renderer>().material;
            Background.GetComponent<Renderer>().material = GameObject.Find(state.Background).GetComponent<Renderer>().material;



        }

        State defaulState;
        State defaultSelectState;

        public void setDefaultState(State select)
        {
            this.defaulState = select;
        }
        public void setSelectedState(State select)
        {
            this.defaultSelectState = select;
        }
        public void Select()
        {
            this.ChangeMaterial(defaultSelectState);
        }

        public void Deselect()
        {
            this.ChangeMaterial(defaulState);
        }



        int[] CharacterTris(char c)
        {
            int[] triangles = new int[30];
            switch (c)
            {
                case 'a':
                    triangles = new int[] {
                    23,  22,83,
                    82, 83,22,
                    83, 82, 93,
                    96, 83, 93,
                    86, 83,96,
                    87, 86, 96,
                    27, 86, 87,
                    27, 26,86,
                    66, 53,63,
                    56, 53,66 };
                    return triangles;


                case 'b':
                    triangles = new int[] {
                    22,  93,23,
                    22, 92,93,
                    83, 93,96,
                    83, 96,86,
                    66,  96,87,
                    66, 87,77,
                    53, 63,66,
                    53, 66,56,
                    26, 66,57,
                    26, 57,37,
                    23, 33,36,
                    23, 36,26,
                    65,76,66};
                    return triangles;

                case 'c':
                    triangles = new int[] {
                    32,82,93,
                    32,93,23,
                    83,93,96,
                    83,96,86,
                    76,96,77,
                    77,96,87,
                    23,33,36,
                    23,36,26,
                    26,46,47,
                    26,47,37};
                    return triangles;

                case 'd':
                    triangles = new int[] {
                    22,92,93,
                    22,93,23,
                    83,93,96,
                    83,96,86,
                    26,96,37,
                    37,96,87,
                    23,33,36,
                    23,36,26};
                    return triangles;

                case 'e':
                    triangles = new int[] {
                    22,92,93,
                    22,93,23,
                    83,93,97,
                    83,97,87,
                    53,63,65,
                    53,65,55,
                    23,33,37,
                    23,37,27};
                    return triangles;

                case 'f':
                    triangles = new int[] {
                    22,92,93,
                    22,93,23,
                    83,93,97,
                    83,97,87,
                    53,63,65,
                    53,65,55};
                    return triangles;

                case 'g':
                    triangles = new int[] {
                    32,82,93,
                    32,93,23,
                    83,93,96,
                    83,96,86,
                    76,96,77,
                    77,96,87,
                    23,33,36,
                    23,36,26,
                    26,66,67,
                    26,67,37,
                    54,64,66,
                    54,66,56};
                    return triangles;

                case 'h':
                    triangles = new int[] {
                    22,92,93,
                    22,93,23,
                    26,96,97,
                    26,97,27,
                    53,63,66,
                    53,66,56};
                    return triangles;

                case 'i':
                    triangles = new int[] {
                    34,84,85,
                    34,85,35,
                    83,93,96,
                    83,96,86,
                    23,33,36,
                    23,36,26};
                    return triangles;

                case 'j':
                    triangles = new int[] {
                    35,95,96,
                    35,96,36,
                    32,42,23,
                    42,43,23,
                    23,33,36,
                    23,36,25};
                    return triangles;

                case 'k':
                    triangles = new int[] {
                    22,92,93,
                    22,93,23,
                    53,63,96,
                    53,96,97,
                    53,63,27,
                    53,27,26};
                    return triangles;

                case 'l':
                    triangles = new int[] {
                    22,92,93,
                    22,93,23,
                    23,33,37,
                    23,37,27};
                    return triangles;

                case 'm':
                    triangles = new int[] {
                    22,92,93,
                    22,93,23,
                    26,96,27,
                    27,96,97,
                    92,93,64,
                    93,65,64,
                    64,96,97,
                    64,97,65};
                    return triangles;

                case 'n':
                    triangles = new int[] {
                    22,92,93,
                    22,93,23,
                    26,96,97,
                    26,97,27,
                    73,93,26,
                    93,46,26
                };
                    return triangles;

                case 'o':
                    triangles = new int[] {
                    32,82,93,
                    32,93,23,
                    83,93,96,
                    83,96,86,
                    26,96,37,
                    37,96,87,
                    23,33,36,
                    23,36,26};
                    return triangles;

                case 'p':
                    triangles = new int[] {
                    22,  93,23,
                    22, 92,93,
                    83, 93,96,
                    83, 96,86,
                    56,  96,87,
                    56, 87,67,
                    53, 63,66,
                    53, 66,56};
                    return triangles;

                case 'q':
                    triangles = new int[] {
                    32,82,93,
                    32,93,23,
                    83,93,96,
                    83,96,86,
                    26,96,37,
                    37,96,87,
                    23,33,37,
                    23,37,26,
                    44,54,26,
                    54,55,26,
                    55,27,26,
                    55,37,27};
                    return triangles;

                case 'r':
                    triangles = new int[] {
                    22,  93,23,
                    22, 92,93,
                    83, 93,96,
                    83, 96,86,
                    56,  96,87,
                    56, 87,67,
                    53, 63,66,
                    53, 66,56,
                    53,54,26,
                    54,55,26,
                    55,27,26,
                    55,37,27};
                    return triangles;

                case 's':
                    triangles = new int[] {
                    62,82,93,
                    62,93,53,
                    83,93,96,
                    83,96,86,
                    76,96,77,
                    77,96,87,
                    23,33,36,
                    23,36,26,
                    26,66,57,
                    26,57,37,
                    53,63,66,
                    53,66,56,
                    32,42,23,
                    42,43,23};
                    return triangles;

                case 't':
                    triangles = new int[] {
                    24,84,85,
                    24,85,25,
                    82,92,97,
                    82,97,87};
                    return triangles;

                case 'u':
                    triangles = new int[] {
                    32,92,93,
                    32,93,23,
                    26,96,37,
                    37,96,97,
                    23,33,36,
                    23,36,26};
                    return triangles;

                case 'v':
                    triangles = new int[] {
                    52,92,93,
                    52,93,53,
                    56,96,57,
                    57,96,97,
                    52,25,24,
                    52,53,25,
                    24,56,57,
                    24,57,25};
                    return triangles;

                case 'w':
                    triangles = new int[] {
                    22,92,93,
                    22,93,23,
                    26,96,27,
                    27,96,97,
                    22,54,55,
                    22,55,23,
                    54,55,26,
                    55,27,26};

                    return triangles;

                case 'x':
                    triangles = new int[] {
                    72,73,46,
                    73,47,46,
                    42,76,77,
                    42,77,43,
                    72,92,93,
                    72,93,73,
                    76,96,77,
                    96,97,77,
                    22,42,23,
                    42,43,23,
                    46,47,26,
                    26,47,27};
                    return triangles;

                case 'y':
                    triangles = new int[] {
                    72,73,54,
                    73,55,54,
                    54,76,77,
                    54,77,55,
                    72,92,93,
                    72,93,73,
                    76,96,77,
                    96,97,77,
                    54,55,24,
                    24,55,25};
                    return triangles;

                case 'z':
                    triangles = new int[] {
                    22,32,37,
                    22,37,27,
                    82,92,97,
                    82,97,87,
                    32,86,87,
                    32,87,33};
                    return triangles;

                case '0':
                    triangles = new int[] {
                    32,82,93,
                    32,93,23,
                    83,93,96,
                    83,96,86,
                    26,96,37,
                    37,96,87,
                    23,33,36,
                    23,36,26,
                    33,43,86,
                    33,86,76};

                    return triangles;

                case '1':
                    triangles = new int[] {
                    34,94,95,
                    34,95,35,
                    23,33,36,
                    23,36,26,
                    73,83,94,
                    73,94,74};
                    return triangles;

                case '2':
                    triangles = new int[] {
                    72,82,83,
                    72,83,73,
                    82,93,96,
                    82,96,87,
                    66,86,67,
                    86,87,67,
                    32,66,67,
                    32,67,33,
                    22,32,37,
                    22,37,27};
                    return triangles;

                case '3':
                    triangles = new int[] {
                    72,82,83,
                    72,83,73,
                    82,93,96,
                    82,96,87,
                    56,86,67,
                    86,87,67,
                    54,64,66,
                    54,66,56,
                    26,66,57,
                    26,57,37,
                    32,42,43,
                    32,43,23,
                    23,33,36,
                    23,36,26};
                    return triangles;

                case '4':
                    triangles = new int[] {
                    42,52,95,
                    42,95,96,
                    42,52,57,
                    42,57,47,
                    25,95,96,
                    25,96,26};
                    return triangles;

                case '5':
                    triangles = new int[]{
                    82,92,97,
                    82,97,87,
                    52,82,83,
                    52,83,53,
                    53,63,66,
                    53,66,57,
                    56,57,37,
                    56,37,26,
                    23,32,36,
                    23,36,26,
                    32,42,43,
                    32,43,33};
                    return triangles;

                case '6':
                    triangles = new int[] {
                    82,93,96,
                    82,96,86,
                    76,96,77,
                    96,87,77,
                    32,82,83,
                    32,83,33,
                    53,63,66,
                    53,66,57,
                    56,57,37,
                    56,37,26,
                    23,32,36,
                    23,36,26};
                    return triangles;

                case '7':
                    triangles = new int[] {
                    82,92,97,
                    82,97,87,
                    76,86,87,
                    76,87,77,
                    43,76,77,
                    43,77,44,
                    23,43,44,
                    23,44,24


                };
                    return triangles;

                case '8':
                    triangles = new int[] {
                    82,93,96,
                    82,96,87,
                    62,82,83,
                    62,83,53,
                    56,86,87,
                    56,87,67,
                    52,63,66,
                    52,66,57,
                    32,52,53,
                    32,53,23,
                    23,33,36,
                    23,36,26,
                    56,57,26,
                    26,57,37
                };
                    return triangles;

                case '9':
                    triangles = new int[] {
                    82,93,96,
                    82,96,87,
                    62,82,83,
                    62,83,53,
                    26,86,87,
                    26,87,37,
                    53,63,66,
                    53,66,56,
                    23,33,36,
                    23,36,26,
                    32,42,43,
                    32,43,23
                };
                    return triangles;

                case '_':
                    triangles = new int[] {
                    22,32,37,
                    22,37,27
                };
                    return triangles;

                case '-':
                    triangles = new int[] {
                    53,63,66,
                    53,66,56
                };
                    return triangles;

                case '(':
                    triangles = new int[] {
                    34,84,95,
                    34,95,25,
                    85,95,96,
                    85,96,86,
                    25,35,36,
                    25,36,26
                };
                    return triangles;

                case ')':
                    triangles = new int[] {
                    24,94,85,
                    24,85,35,
                    83,93,94,
                    83,94,84,
                    23,33,34,
                    23,34,24
                };
                    return triangles;

                case '!':
                    triangles = new int[] {
                    44,94,95,
                    44,95,45,
                    24,34,35,
                    24,35,25
                };
                    return triangles;

                case '?':
                    triangles = new int[] {
                    72,82,93,
                    72,93,73,
                    83,93,96,
                    83,96,87,
                    86,87,56,
                    87,67,56,
                    44,66,56,
                    44,56,45,
                    24,34,35,
                    24,35,25

                };
                    return triangles;

                case '.':
                    triangles = new int[] {
                    23,33,34,
                    23,34,24
                };
                    return triangles;

                case ',':
                    triangles = new int[] {
                    43,53,55,
                    43,55,45,
                    24,44,45,
                    24,45,35,
                    23,34,24
                };
                    return triangles;

                case ';':
                    triangles = new int[] {
                    63,83,85,
                    63,85,65,
                    43,53,55,
                    43,55,45,
                    24,44,45,
                    24,45,35,
                    23,34,24
                };
                    return triangles;

                case ':':
                    triangles = new int[] {
                    63,83,85,
                    63,85,65,
                    33,53,55,
                    33,55,35
                };
                    return triangles;

                case '@':
                    triangles = new int[] {
                    82,93,96,
                    82,96,87,
                    32,82,83,
                    32,83,23,
                    26,86,87,
                    26,87,27,
                    34,54,55,
                    34,55,35,
                    54,65,66,
                    54,66,56,
                    23,33,36,
                    23,36,26
                };
                    return triangles;

                case '/':
                    triangles = new int[] {
                    32,86,87,
                    32,87,33
                };
                    return triangles;

                case '+':
                    triangles = new int[] {
                    52,62,67,
                    52,67,57,
                    34,84,85,
                    34,85,35
                };
                    return triangles;

                case '*':
                    triangles = new int[] {
                    52,62,67,
                    52,67,57,
                    34,84,85,
                    34,85,35,
                    82,83,37,
                    82,37,36,
                    32,86,87,
                    32,87,33
                };
                    return triangles;

                case '&':
                    triangles = new int[] {
                    82,83,37,
                    82,37,36,
                    32,86,87,
                    32,87,33
                };
                    return triangles;

                case '=':
                    triangles = new int[] {
                    42,52,57,
                    42,57,47,
                    62,72,77,
                    62,77,67
                };
                    return triangles;

                case '%':
                    triangles = new int[] {
                    52,62,67,
                    52,67,57,
                    74,84,85,
                    74,85,75,
                    34,44,45,
                    34,45,35

                };
                    return triangles;

                case '#':
                    triangles = new int[] {
                    42,52,57,
                    42,57,47,
                    62,72,77,
                    62,77,67,
                    23,93,94,
                    23,94,24,
                    25,95,96,
                    25,96,26
                };
                    return triangles;

                case '>':
                    triangles = new int[] {
                    82,92,65,
                    82,65,55,
                    32,65,55,
                    32,55,22,
                    54,64,65,
                };
                    return triangles;

                case '<':
                    triangles = new int[] {
                    64,97,87,
                    64,87,54,
                    54,64,37,
                    54,37,27,
                    64,65,55
                };
                    return triangles;

                case '"':
                    triangles = new int[] {
                    72,82,84,
                    72,84,74,
                    53,73,74,
                    53,74,64,
                    52,63,53,

                    75,85,87,
                    75,87,77,
                    56,76,77,
                    56,77,67,
                    55,66,56
                };
                    return triangles;

                case '\'':
                    triangles = new int[] {
                    73,83,85,
                    73,85,75,
                    54,74,75,
                    54,75,65,
                    53,64,54,

                };
                    return triangles;

                default:
                    //triangles = new int[] { 22, 92, 97, 22, 97, 27 };
                    triangles = new int[] { 22, 22, 22 };
                    return triangles;


            }
        }
    }



    public class Origin
    {
        public float X;
        public float Y;
        public float Z;
        public float CreationX;
        public float CreationY;
        public float CreationZ;

        public List<Step> Steps;

        public float precision;

        public Origin(float x, float y, float z)
        {
            this.X = x;
            this.Y = y;
            this.Z = z;

            this.CreationX = x;
            this.CreationY = y;
            this.CreationZ = z;
            precision = 1.0f;

            Steps = new List<Step>();

            Step PerpendicularOne = new Step(1.0f, 0.0f, 0.0f);
            Step PerpendicularTwo = new Step(0.0f, 1.0f, 0.0f);
            Step PerpendicularThree = new Step(0.0f, 0.0f, 1.0f);

            Steps.Add(PerpendicularOne);
            Steps.Add(PerpendicularOne);
            Steps.Add(PerpendicularTwo);
            Steps.Add(PerpendicularThree);

        }

        public Origin(float x, float y, float z, float prec)
        {

            this.X = x;
            this.Y = y;
            this.Z = z;

            this.CreationX = x;
            this.CreationY = y;
            this.CreationZ = z;

            Steps = new List<Step>();

            Step PerpendicularOne = new Step(1.0f, 0.0f, 0.0f);
            Step PerpendicularTwo = new Step(0.0f, 1.0f, 0.0f);
            Step PerpendicularThree = new Step(0.0f, 0.0f, 1.0f);

            Steps.Add(PerpendicularOne);
            Steps.Add(PerpendicularOne);
            Steps.Add(PerpendicularTwo);
            Steps.Add(PerpendicularThree);

            PrecisionSteps(prec);
        }

        public Origin Next(int times)
        {
            this.X = this.X + (Steps[0].X * times * this.precision);
            this.Y = this.Y + (Steps[0].Y * times * this.precision);
            this.Z = this.Z + (Steps[0].Z * times * this.precision);

            return this;
        }

        public Origin Previous(int times)
        {

            this.X = this.X - (Steps[0].X * times * this.precision);
            this.Y = this.Y - (Steps[0].Y * times * this.precision);
            this.Z = this.Z - (Steps[0].Z * times * this.precision);
            return this;
        }
        public Origin BackToCreation()
        {

            this.X = this.CreationX;
            this.Y = this.CreationY;
            this.Z = this.CreationZ;
            return this;
        }
        public Origin Dimension(int dim)
        {
            Steps[0] = Steps[dim];
            return this;
        }

        public Origin PrecisionSteps(float precs)
        {
            this.precision = precs;
            Steps[0] = new Step(Steps[0].X * precision, Steps[0].Y * precision, Steps[0].Z * precision);
            // Steps[1] = new Step(Steps[1].X * precision, Steps[1].Y * precision, Steps[1].Z * precision);
            //Steps[2] = new Step(Steps[2].X * precision, Steps[2].Y * precision, Steps[2].Z * precision);
            //Steps[3] = new Step(Steps[3].X * precision, Steps[3].Y * precision, Steps[3].Z * precision);
            return this;
        }

        public Origin ReverseDirection()
        {
            Steps[0] = Steps[0].Reverse();
            return this;
        }

        public Origin Clone()
        {
            Origin ori = new Origin(this.X, this.Y, this.Z, this.precision);
            ori.CreationX = this.CreationX;
            ori.CreationY = this.CreationY;
            ori.CreationZ = this.CreationZ;
            return ori;

        }

        public Vector3 GetVector3()
        {
            return new Vector3(this.X, this.Y, this.Z);
        }




    }

    public class Step
    {

        public float X;
        public float Y;
        public float Z;

        public float legOne;
        public float legTwo;
        public float legfour;

        float legThree;
        float legFive;

        Origin pointOne, pointTwo;

        public Step(Origin firstOrigin, Origin secondOrigin)
        {
            pointOne = firstOrigin;
            pointTwo = secondOrigin;

            this.X = secondOrigin.X - firstOrigin.X;
            this.Y = secondOrigin.Y - firstOrigin.Y;
            this.Z = secondOrigin.Z - firstOrigin.Z;


        }


        public Step(float xx, float yy, float zz)
        {
            this.X = xx;
            this.Y = yy;
            this.Z = zz;
        }

        public float directLengthBetween()
        {
            float legOne = difference(pointOne.X, pointTwo.X);
            float legTwo = difference(pointOne.Y, pointTwo.Y);
            float legfour = difference(pointOne.Z, pointTwo.Z);

            float legThree = Mathf.Sqrt((legOne * legOne) + (legTwo * legTwo));
            float legFive = Mathf.Sqrt((legThree * legThree) + (legfour * legfour));
            return legFive;
        }


        private float difference(float onef, float twof)
        {
            if (onef > twof)
            {
                return onef - twof;
            }
            return twof - onef;
        }

        public Step Reverse()
        {
            return (new Step(this.X * -1, this.Y * -1, this.Z * -1));
        }

    }
    public class CrimsonData
    {
        string[] d0 = new string[]
        {
            "academic disciplines",
            "historical background",
            "humanities",
            "social sciences",
            "natural sciences",
            "formal sciences",
            "professions and applied sciences"

        };

        string[] d1 = new string[]
        {
            "humanities",
            "human history",
            "linguistics",
            "arts",
            "philosophies",
            "religion"

        };
        string[] d2 = new string[]
        {
            "social sciences",
            "anthropology",
            "ethnic and cultural studies",
            "archaeology",
            "area studies",
            "economics",
            "gender and sexuality studies",
            "geography",
            "organizational studies",
            "political science",
            "psychology",
            "sociology"

        };
        string[] d3 = new string[]
        {
            "natural sciences",
            "biology",
            "chemistry",
            "physics",
            "earth sciences",
            "space sciences"

        };
        string[] d4 = new string[]
        {
            "formal sciences",
            "mathematics",
            "computer sciences",
            "logic",
            "statistics",
            "systems science",

        };

        string[] d5 = new string[]
        {
            "mathematics",
            "applied mathematics",
            "pure mathematics"

        };
        string[] d6 = new string[]
        {
            "applied",
            "agriculture",
            "architecture and design",
            "business",
            "divinity",
            "education",
            "engineering and technology",
            "environmental studies and forestry",
            "family and consumer science",
            "human physical performance and recreation",
            "journalism",
            "media studies",
            "communication",
            "law",
            "library and museum studies",
            "medicine",
            "military sciences",
            "public administration",
            "social work",
            "transportation"

        };

        string[] d7 = new string[]
        {
            "list of theoretical physicists",
            "ancient times",
            "middle ages",
            "15th-16th century",
            "15th-17th century",
            "16th-17th century",
            "17th-18th century",
            "18th-19th century",
            "19th century",
            "19th-20th century",
            "20th century",
            "20th-21st century",
            "fictional theoretical physicists"

        };

        string[] d8 = new string[]
        {
            "ancient times",
            "thales",
            "pythagoras",
            "dymocritus",
            "archimedes"

        };

        string[] d9= new string[]
        {
            "middle ages",
            "ibn al-haytham",
            "al beruni",
            "omar khayyam",
            "al farabi",
            "nasir al-din tusi"

        };
        string[] d10 = new string[]
        {
            "15th-16th century",
            "nicolaus copernicus"

        };

        string[] d11 = new string[]
        {
            "16th-17th century",
            "galileo galilei",
            "johannes kepler",
            "rene descartes"

        };

        string[] d12 = new string[]
       {
            "17th-18th century",
            "christiaan huygens",
            "isaac newton",
            "gottfried leibniz"

       };

        string[] d13 = new string[]
        {
            "18th-19th century",
            "leonhard euler",
            "joseph lagrange",
            "charles coulomb",
            "joseph fourier",
            "thomas young",
            "michael faraday"

        };

        string[] d14 = new string[]
        {
            "19th century",
            "william hamilton",
            "herman von helmholtz",
            "james clerk maxwell",
            "heinrich hertz"

        };

        string[] d15 = new string[]
        {
            "19th-20th century",
            "william thomson",
            "ernst mach",
            "j. willard gibbs",
            "ludwig boltzman",
            "nikolay umov",
            "hendrik lorentz",
            "henri poincare",
            "max planck",
            "pieter zeeman",
            "marie curie",
            "arnold sommerfeld",
            "ernest ruthford",
            "james jeans",
            "albert einstein",
            "max von laue",
            "paul and tatyana ehrenfest",
            "richard tolman",
            "arthur eddington",
            "emmy noether",
            "max born",
            "niels bohr",
            "erwin schrodinger",
            "arthur holly compton",


        };

        string[] d16 = new string[]
    {
            "20th century",
            "werner heisenberg",
            "samuel abraham goudsmit",
            "pascual jordan",
            "eugene wigner",
            "robert openheimer",
            "george gamow",
            "felix bloch",
            "eltore majorana",
            "maria goeppert-mayer",
            "j. hans d. jensen"

    };
        string[] d17 = new string[]
    {
            "20th-21st century",
            "hans bethe",
            "john wheeler",
            "vitaly ginzburg",
            "peter westervelt",
            "yoichiro nambu",
            "chen ning yang",
            "behram kursunoglu",
            "philip warren anderson",
            "freeman dyson",
            "bruno zumino",
            "..."

    };
        string[] d18 = new string[]
    {
            "fictional theoretical physicists",
            "gordon freeman",
            "tony stark",
            "eli vance",
            "petisaac kleiner",
            "rodney mckay",
            "samantha carter",
            "larry fleinhardt",
            "leonardo vetra",
            "quinn mallroy",
            "maximillian artro"

    };
        string[] d19 = new string[]
            {
                "crimsonpaper",
                "prototype 1"

            };


        public List<string[]> dataset;
        public CrimsonData()
        {
            dataset = new List<string[]>();
            dataset.Add(d0);
            dataset.Add(d1);
            dataset.Add(d2);
            dataset.Add(d3);
            dataset.Add(d4);
            dataset.Add(d5);
            dataset.Add(d6);
            dataset.Add(d7);
            dataset.Add(d8);
            dataset.Add(d9);
            dataset.Add(d10);
            dataset.Add(d11);
            dataset.Add(d12);
            dataset.Add(d13);

            dataset.Add(d14);
            dataset.Add(d15);
            dataset.Add(d16);
            dataset.Add(d17);
            dataset.Add(d18);
            dataset.Add(d19);

        }

        public string[] getCrimsonList(string parent)
        {
            //return dataset[getCrimsonListPosition(parentHeader)];
            //}

            //public int getCrimsonListPosition(string parent)
            //{
            if (parent.Contains("."))
            {
                parent = parent.Substring(0, parent.Length - 1);
            }
            string[] tsarray;
            for (int i = 0; i < dataset.Count; i++)
            {
                tsarray = dataset[i];

                if (tsarray[0] == parent)
                {
                    return dataset[i];

                }

            }
            Debug.Log("this happened for -" + parent + "");
            return new string[] {parent };

        }

    }





}
