module App {
    export class vmdlExampleScreen {
        public Greeting: string;
        public DataModel: dmdlExample[]=[];

        constructor() {
            
        }

        public static create() {
            var ret = new vmdlExampleScreen();
            ret.Greeting = "Welcome ";
            ret.DataModel.push(<dmdlExample>{
                Id: 0,
                Name:"Kazuo" 
            });
        }
    }
} 