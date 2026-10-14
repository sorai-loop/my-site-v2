import SignPostSVG from '../../assets/svg/signpost.svg?react';

export const SignSection = () =>{
    return(
        <>
            <ul id='signSection'>
                <a href='#worksSection'>Works</a>
                <a href='#articlesSection'>Articles</a>
                <a href='#stacksSection'>Stacks</a>
                <a href='#profileSection'>Profile</a>
            </ul>
            <SignPostSVG />
        </>
    );
}