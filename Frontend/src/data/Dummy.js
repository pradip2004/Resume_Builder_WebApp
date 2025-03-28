export default{
      firstName:'James',
      lastName:'Carter',
      jobTitle:'full stack developer',
      address:'525 N tryon Street, NC 28117',
      phone:'(123)-456-7890',
      email:'exmaple@gmail.com',
      themeColor:"#ff6666",
      summery:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      experience:[
          {
              id:1,
              title:'Full Stack Developer',
              companyName:'Amazon',
              city:'New York',
              state:'NY',
              startDate:'Jan 2021',
              endDate:'',
              currentlyWorking:true,
              workSummery:' Designed, developed, and maintained full-stack applications using React and Node.js.\n'+
              '• Implemented responsive user interfaces with React, ensuring seamless user experiences across\n'+
              'various devices and browsers.\n'+
              '• Maintaining the React Native in-house organization application.'+
              '• CreatedRESTfulAPIs withNode.js and Express,facilitating data communicationbetween the front-end'+
              'and back-end systems.'
          },
          {
              id:2,
              title:'Frontend Developer',
              companyName:'Google',
              city:'Charlotte',
              state:'NC',
              startDate:'May 2019',
              endDate:'Jan 2021',
              currentlyWorking:false,
              workSummery:' Designed, developed, and maintained full-stack applications using React and Node.js.'+
              '• Implemented responsive user interfaces with React, ensuring seamless user experiences across'+
              'various devices and browsers.'+
              '• Maintaining the React Native in-house organization application.'+
              '• CreatedRESTfulAPIs withNode.js and Express,facilitating data communicationbetween the front-end'+
              'and back-end systems.'
          }
      ],
      education:[
          {
              id:1,
              universityName:'Western Illinois University',
              startDate:'Aug 2018',
              endDate:'Dec:2019',
              degree:'Master',
              major:'Computer Science',
              description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
          },
          {
              id:2,
              universityName:'Western Illinois University',
              startDate:'Aug 2018',
              endDate:'Dec:2019',
              degree:'Master',
              major:'Computer Science',
              description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
          }
      ],
      skills: [
          {
              category: 'Frontend',
              items: ['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Vue.js']
          },
          {
              category: 'Backend',
              items: ['Node.js', 'Express', 'Python', 'Java', 'PHP']
          },
          {
              category: 'Database',
              items: ['MySQL', 'MongoDB', 'PostgreSQL', 'Redis']
          },
          {
              category: 'Tools & Others',
              items: ['Git', 'Docker', 'AWS', 'Jest', 'Webpack']
          }
      ],
      achievements: [
          {
              id: 1,
              title: 'Best Employee Award',
              description: 'Received recognition for outstanding performance and innovation in developing a new feature that increased user engagement by 40%',
              date: 'Dec 2022'
          },
          {
              id: 2,
              title: 'Project Excellence',
              description: 'Led a team of 5 developers to successfully deliver a critical project 2 weeks ahead of schedule',
              date: 'Mar 2022'
          }
      ],
      certificates: [
          {
              id: 1,
              title: 'AWS Certified Solutions Architect',
              issuer: 'Amazon Web Services',
              date: 'Jan 2023',
              link: 'https://aws.amazon.com/certification/'
          },
          {
              id: 2,
              title: 'Professional Scrum Master I',
              issuer: 'Scrum.org',
              date: 'Jun 2022',
              link: 'https://www.scrum.org/'
          }
      ]
  }