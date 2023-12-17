import Link from 'next/link';

export default function Resume() {
  return (
    <div className='p-8 text-black bg-white'>
      <div className='flex items-center justify-between pb-4 border-b-2 border-black'>
        <div>
          <h1 className='text-4xl font-bold'>Filip Wojda</h1>
          <div className='flex flex-row justify-between'>
            <p className='text-sm'>
              wojdafilipdev@gmail.com | (917) 913-1450 |{' '}
            </p>
            <Link
              className='text-blue-600'
              href='www.linkedin.com/in/filip-wojda/'
            >
              www.linkedin.com/in/filip-wojda/
            </Link>
          </div>
        </div>
      </div>
      <section className='mt-6'>
        <h2 className='text-xl font-bold underline'>EDUCATION</h2>
        <div className='flex flex-col justify-between'>
          <p className='mt-2 font-bold '>
            CUNY Borough of Manhattan Community College, New York, NY
          </p>
          <p className='italic'>Expected May 2024</p>
        </div>

        <p>Associate in Science in Computer Science</p>
        <ul className='ml-5 list-disc'>
          <li>
            Relevant Courses: Database Systems I, Adv. Programming Techniques,
            University Physics I, Discrete Mathematics
          </li>
          <li>
            Certifications: AWS Cloud Practitioner, CITI Responsible Conduct of
            Research
          </li>
        </ul>
      </section>
      <section className='mt-6'>
        <h2 className='text-xl font-bold underline'>PROJECTS</h2>
        <div className='mt-2'>
          <h3 className='font-bold'>
            knode, Next.js, TypeScript, OpenAI, Supabase
          </h3>
          <p className='italic'>Dec. 2023 - Present</p>
          <ul className='ml-5 list-disc'>
            <li>
              Spearheaded the engineering of a pioneering SaaS platform focused
              on revolutionizing STEM education through an exploratory,
              iterative, and personalized learning interface in the form of an
              AI-powered, interactive graph canvas.
            </li>
            <li>
              Conducted thorough market research, identifying critical dropout
              rates in STEM majors and CS courses, which guided the development
              of our tailored learning solution.
            </li>
            <li>
              Demonstrated exceptional teamwork and technical prowess by rapidly
              prototyping, testing with Columbia University&apos;s Data
              Structure class, demonstrated a 85% improvement in learning,
              setting a new benchmark in educational tech innovation.
            </li>
            <li>
              Began with critical market research during the hackathon,
              uncovering STEM education challenges; ongoing analysis now shows a
              60% reduction in dropout rates in targeted Intro CS courses using
              our platform.
            </li>
          </ul>
        </div>
        <div className='mt-2'>
          <h3 className='font-bold'>TypeLaunch.io, Next.js, Python, AWS</h3>
          <p className='italic'>Feb. 2023 - Present</p>
          <ul className='ml-5 list-disc'>
            <li>
              Led the development of TypeLaunch.io, an advanced SaaS platform
              offering AI-driven video generation for marketing, creating
              animations aligned with word semantics
            </li>
            <li>
              Programmed visual animations, prioritized modularity allowing
              infinite possibilities of combinations for any length of text.
            </li>
            <li>
              Utilized design-oriented thinking and feedback-based expansion to
              create industry-level visuals.
            </li>
            <li>
              Conducted exploratory research with professionals within the field
              which demonstrated 70% interest in transferring from their current
              tools.
            </li>
            <li>
              Implemented robust APIs leveraging AWS services, enhancing system
              security and performance.
            </li>
          </ul>
        </div>
      </section>
      <section className='mt-6'>
        <h2 className='text-xl font-bold underline'>WORK EXPERIENCE</h2>
        <div className='mt-2'>
          <h3 className='font-bold'>
            CUNY Research Scholars Program, Student Researcher
          </h3>
          <p className='italic'>Sep. 2023 - Present</p>
          <ul className='ml-5 list-disc'>
            <li>
              Explored and researched computer techniques to accelerate series
              expansion methods, positioning them as viable alternatives to
              transform methods in terms of computational speed.
            </li>
            <li>
              Designed and coded simulations of X-rays in CT scans using various
              mathematical calculations.
            </li>
            <li>
              Collaborated closely with my mentor, synthesizing feedback and
              refining the research approach to achieve optimal results.
            </li>
            <li>
              Analyzed the significance of reconstructing biological specimens
              from projections to enhance understanding of object functions and
              interactions, pivotal for surgical planning and medical research.
            </li>
            <li>
              Presented research findings and articulated the potential impact
              of faster series expansion methods on the future of medical
              imaging.
            </li>
          </ul>
        </div>
      </section>
      <section className='mt-6'>
        <h2 className='text-xl font-bold underline'>
          LEADERSHIP AND EXTRACURRICULAR ACTIVITIES
        </h2>
        <div className='mt-2'>
          <h3 className='font-bold'>L1aMaHack @ Cornell Tech, Participant</h3>
          <p className='italic'>Dec. 8-10, 2023</p>
          <ul className='ml-5 list-disc'>
            <li>Developed a prototype of ‘knode’ in a 24-hour sprint.</li>
          </ul>
        </div>
        <div className='mt-2'>
          <h3 className='font-bold'>OSSHack @ Cornell Tech, Participant</h3>
          <p className='italic'>Dec. 2-3, 2023</p>
          <ul className='ml-5 list-disc'>
            <li>
              Worked with a team alongside industry professionals to deliver a
              new feature into the codebase of a meeting scheduling
              infrastructure company
            </li>
          </ul>
        </div>
        <div className='mt-2'>
          <h3 className='font-bold'>
            BMCC Student Government Association, Senator
          </h3>
          <p className='italic'>Sep. 2023 - Present</p>
          <ul className='ml-5 list-disc'>
            <li>
              Attend and assist in organizing meetings, ensuring active
              representation and voicing student concerns.
            </li>
            <li>
              Advocate for the student body, ensuring their perspectives are
              central to the organization’s decisions.
            </li>
            <li>
              Adapt to evolving challenges within the school’s community by
              taking on varied responsibilities as directed by the SGA.
            </li>
          </ul>
        </div>
        <div className='mt-2'>
          <h3 className='font-bold'>
            BNY Mellon Campus Mentorship Program, Mentee
          </h3>
          <p className='italic'>Sep. 2023 - Present</p>
          <ul className='ml-5 list-disc'>
            <li>
              Collaborated with a mentor on data engineering topics, deepening
              understanding of advanced concepts.
            </li>
            <li>
              Initiated clarifying discussions and set clear goals, ensuring
              comprehensive grasp of complex data and engineering topics.
            </li>
          </ul>
        </div>
        <div className='mt-2'>
          <h3 className='font-bold'>NYC CEO Jobs Council, Ambassador</h3>
          <p className='italic'>Sep. 2023 - Present</p>
          <ul className='ml-5 list-disc'>
            <li>
              Achieved significant participation in key Jobs Council events,
              helping students get to know the careers and employees of varying
              high-achieving institutions
            </li>
            <li>
              Expanded the reach of Jobs Council initiatives through
              strategically coordinated email and social media campaigns.
            </li>
            <li>
              Advocated for CUNY students, aiming to secure them internships at
              esteemed Jobs Council Member Companies.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
