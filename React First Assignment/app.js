const aboutme = React.createElement('div', '{id="aboutme"}',[
    React.createElement('h1', '{id="heading"}', 'Personal Info'),
    React.createElement('div' , '{id="prsnolInfo"}', [
        React.createElement('h4', '{}', "Name: Hamza Sheikh"),
        React.createElement('h4', '{}', "Father Name: M.Murad"),
        React.createElement('h4', '{}', "Phone: 837645436"),
        React.createElement('h4', '{}', "Email: xyz@gmail.com"),
        React.createElement('h4', '{}', "DOB: 21-Jan-2004"),
    ]),
    React.createElement('h1', '{id="heading"}', 'Qualification'),
    React.createElement('div' , '{id="qualification"}', [
        React.createElement('h4', '{}', "College Name: Islamia College"),
        React.createElement('h4', '{}', "Grade: A"),
        React.createElement('h4', '{}', "I am a student of web and app development"),
        React.createElement('p', '{}', 
        "Seeking a challenging and fast-paced role where i can levarage my skills and experience to make a significient impact"),
    ]),
    React.createElement('h1', '{id="heading"}', 'Skils'),
    React.createElement('div' , '{id="skils"}', [
        React.createElement('li', '{}', "HTML"),
        React.createElement('li', '{}', "CSS with Bootrap"),
        React.createElement('li', '{}', "Javascript"),
        React.createElement('li', '{}', "Typescript"),
        React.createElement('li', '{}', "Microsoft Basic work"),
        React.createElement('li', '{}', "Content Writing"),
    ]),
    React.createElement('h1', '{id="heading"}', 'Experience'),
    React.createElement('div' , '{id="experience"}', [
        React.createElement('li', '{}', "2 Years working experience as a team leader in call center Krachi"),
    ]), 
    React.createElement('h1', '{id="heading"}', 'Language'),
    React.createElement('div' , '{id="language"}', [
        React.createElement('li', '{}', "English"),
        React.createElement('li', '{}', "Urdu"),
    ]),   
])

const root = ReactDOM.createRoot(document.getElementById("container"))

root.render(aboutme)