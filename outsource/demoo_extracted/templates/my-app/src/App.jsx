import Resume from "./Resume";

function App() {
  const data = {
    name: "LORNA ALVARADO",
    role: "Digital Marketing Specialist",
    phone: "+123-456-7890",
    email: "hello@reallygreatsite.com",
    address: "123 Anywhere St, Any City",
    image: "https://i.pravatar.cc/150?img=47",

    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat. Mauris convallis, mi at mattis malesuada, neque nulla volutpat dolor, hendrerit faucibus eros nibh ut nunc.",

    skills: [
      "Web Design",
      "Branding",
      "Graphic Design",
      "SEO",
      "Marketing",
      "Copywriting & Story writing"
    ],

    rewards: [
      "Oct 2019 | Liceria & Co. The Best Employee of the Year",
      "May 2017 | Liceria & Co. The Best Employee of the Year"
    ],

    languages: ["English", "French"],

    experience: [
      {
        title: "Social Media Manager",
        company: "Larana Inc, Branding",
        years: "2019 - 2022",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum."
      },
      {
        title: "Digital Marketing Manager",
        company: "Shodwe Cosmetics, Branding",
        years: "2017 - 2019",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor."
      },
      {
        title: "Digital Marketing Manager",
        company: "Shodwe Cosmetics, Branding",
        years: "2015 - 2017",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet."
      }
    ],

    education: [
      {
        degree: "Master of Marketing and Business",
        college: "Fauget University",
        years: "2011 - 2014",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet."
      },
      {
        degree: "Master of Marketing and Business",
        college: "Fauget University",
        years: "2008 - 2012",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      }
    ]
  };

  return <Resume data={data} />;
}

export default App;