export const personalInfo = {
  name: "Prendas Adrian",
  title: "Software Engineer",
  about: "I have always found it very interesting to understand how information technologies work, I feel attracted and passioned to the software development, I see intriguing the fact that we are able to represent an entire world using two discrete values, zero and one, almost anything can be possible in our digital world.",
  address: "San Vito, Coto Brus, Puntarenas, Costa Rica",
  phone: "(+506) 8795 0618",
  phoneLink: "tel:+50687950618",
  aboutContact: "I love cycling, running, learning and working, so don't be shy, i am just an email away.",
  profileImage: "/images/yo.jpg",
};

export const socialLinks = [
  {
    name: "Email",
    url: "mailto:prendas.adrian@proton.me?subject=Consulta&body=Hola,%20quisiera%20m%C3%A1s%20informaci%C3%B3n.",
    display: "prendas.adrian@proton.me",
    label: "Email Address",
    icon: "/images/email.svg",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/prendas.adrian",
    display: "@prendas.adrian",
    label: "Facebook Profile",
    icon: "/images/facebook.svg",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/prendas-adrian-/",
    display: "@prendas-adrian-",
    label: "Linkedin Profile",
    icon: "/images/linkedin.svg",
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/50687950618",
    display: "@prendas.adrian",
    label: "Whatsapp",
    icon: "/images/whatsapp-logo.jpg",
  },
  {
    name: "X",
    url: "https://twitter.com/prendas_adrian",
    display: "@prendas_adrian",
    label: "X",
    icon: "/images/x.png",
  },
  {
    name: "Telegram",
    url: "https://t.me/prendas_adrian",
    display: "@prendas_adrian",
    label: "Telegram",
    icon: "/images/telegram.png",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/prendas.adrian/",
    display: "@prendas.adrian",
    label: "Instagram",
    icon: "/images/Instagram-Icon.png",
  },
  {
    name: "Threads",
    url: "https://www.threads.com/@prendas.adrian",
    display: "@prendas.adrian",
    label: "Threads",
    icon: "/images/threads.jpeg",
  },
    {
    name: "Github",
    url: "https://www.github.com/prendas-adrian",
    display: "@prendas-adrian",
    label: "Github",
    icon: "/images/github.png",
  },
  {
    name: "Phone",
    url: "tel:+50687950618",
    display: "(+506) 8795 0618",
    label: "Phone",
    icon: "/images/smartphone.svg",
  },
];

export const solutions = [
  "Desktop",
  "Web",
  "Mobile",
];

export const projects = [
  {
    id: "sudoku",
    title: "Sudoku Game",
    description: [
      "The Sudoku is a game that traces to the Egyptians, they used to play this game using 9 symbols to fill the 9 times 9 matrix, the rules are straightforward, the symbol can't be repeated in the same column, row or matrix 3 times 3 that result from divide the main matrix in 9 matrices of 3 times 3",
      "The applicacion was coded using MEAN stack, that means that the tecnologies used were:",
      "The general problem of solving Sudoku puzzles is known to be a NP-complete"
    ],
    image: "/images/sudoku.gif",
    extraText: "you can see: ",
    extraLinkLabel: "The sudoku Game",
    extraLinkUrl: "https://sudoku-backend-jssl.onrender.com/",
    repoLabel: "Sudoku_Game",
    repoUrl: "https://github.com/prendas-adrian/Sudoku_Game",
  },
   {
    id: "Permutate",
    title: "Permutation Generator",
    description: [
      "Permutate is a university project that compares several permutation algorithms by measuring the number of swaps each algorithm performs. The goal is to generate CSV output for algorithm analysis and to illustrate algorithm behavior using Java and JavaScript implementations.",
    ],
    image: "https://raw.githubusercontent.com/prendas-adrian/Permutate/master/data/instructions.gif",
    repoLabel:"Permutate",
    repoUrl: "https://github.com/prendas-adrian/Permutate",
  },
  {
    id: "transactions",
    title: "Transactions Tracer",
    description: [
      "The database system is one of the most important components of any organization and is the focus of the Hackers attacks. This project was allocated in order to ensure the security of the oracle database, and is focuses on the integrity and Confidentiality of the system, seeking for anomalies or transactions forbidden, in the redo-logs, where the database store the transactions.",
      "In the redo-logs we can see information relate to the trasacctions like: date, kind of operation, owner of the segment, sql executed, sql-1 inverse of query executed, table where the trasacction occurs, tablespace where the tables belongs, time, and the user who executed the query",
      "This project open, read and print the data of the redo-logs, and is the base for develop more complex tools in order to ensure the security of the database",
    ],
    image: "/images/transactions.png",
    repoLabel: "Logs Printing",
    repoUrl: "https://github.com/AdrianPrendas/LogsPrinting",
  },
  {
    id: "mining",
    title: "Text Mining",
    description: [
      "This project uses fundamental principles of the functional paradigm, present from the beginning of computer science, with the composition of functions, to isolate each component of the application, taking advantage of the modularity for easily replace whatever component",
      "The first component is in charge of translating the plain text into a specific format (CSV) for computing analysis and is called f(x)",
      "The second component takes a structured file (CSV) to generate a graph in order to represent the relationship of each element from the text studied and the function is called G(x)",
      "The third component use the same structured file (CSV) to generate the knowledge base to be read from prolog for asking about the relationship between  elements of the graph, we called the H(x) function",
    ],
    image: "https://user-images.githubusercontent.com/16330583/44546355-e6304200-a6d4-11e8-93a0-0c1ba32641ab.png",
    repoLabel: "Text Mining",
    repoUrl: "https://github.com/AdrianPrendas/Text-mining",
  },
  {
    id:"Android client",
    title: "Android client, Enrollment system",
    description:[
      "Esta aplicación no cuenta con base de datos ni conexion a servidor, es un ejemplo de un cliente Android.",
      "Sus datos estan hardcodeados en la lógica de negocios, utilizando el patron de diseño sigleton para tener una unica lista en memoria por cada objeto del dominio, y de esta manera hacer CRUD con las entidades.",
      "La aplicación esta codificada en gran parte con Java, sin embargo, el dominio y la lógica de negocios estan codificadas en Kotlin, aqui podemos aprecias como el codigo funciona en conjunto."
    ],
    image: "https://raw.githubusercontent.com/prendas-adrian/laboratorio_3/refs/heads/master/how-it-works.gif", 
    repoLabel: "laboratorio_3",
    repoUrl: "https://github.com/prendas-adrian/laboratorio_3",
  },
  {
    type: "link",
    title: "Django app, Blog",
    url: "https://github.com/prendas-adrian/blog",
  },
  {
    type: "link",
    title: "Xamarin app, multiplatform",
    url: "https://github.com/AdrianPrendas/laboratorio_4",
  },
  {
    type: "link",
    title: "Android client, React Native, Twenty",
    url: "https://github.com/AdrianPrendas/Twenty",
  },
  {
    type: "link",
    title: "Computer Graphics Generating",
    url: "https://github.com/AdrianPrendas/Graphics",
  },
];

export const skills = {
  programmingLanguages: [
    { name: "Python", width: "70%", color: "carrot" },
    { name: "JavaScript", width: "60%", color: "sunflower" },
    { name: "Java", width: "50%", color: "wisteria" },
    { name: "C/C++", width: "20%", color: "emerald" },
    { name: "Kotlin", width: "15%", color: "asbestos" },
  ],
  database: [
    { name: "Oracle 11g", width: "70%", color: "emerald" },
    { name: "PostgreSQL", width: "60%", color: "wisteria" },
    { name: "Mongo", width: "45%", color: "carrot" },
    { name: "MySql", width: "35%", color: "asbestos" },
  ],
  web: [
    { name: "HTML/CSS", width: "80%", color: "emerald" },
    { name: "JAVA EE", width: "70%", color: "carrot" },
    { name: "MEAN Stack", width: "40%", color: "wisteria" },
    { name: "LAMP Stack", width: "60%", color: "sunflower" },
  ],
  operatingSystems: [
    { name: "Linux", width: "80%", color: "midnight" },
    { name: "Windows", width: "60%", color: "wisteria" },
    { name: "MAC", width: "15%", color: "carrot" },
  ],
  mobile: [
    { name: "Android", width: "20%", color: "sunflower" },
    { name: "React-Native", width: "35%", color: "asbestos" },
  ],
};

export const tabs = [
  { id: "about", label: "About Me", icon: "/images/businessman.svg" },
  { id: "itsolutions", label: "It Solutions", icon: "/images/solutions.svg" },
  { id: "contact", label: "Contact", icon: "/images/contact.svg" },
];
