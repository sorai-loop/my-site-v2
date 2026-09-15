import SignPostSVG from '../../assets/svg/signpost.svg?react';

export const TOCSection = () =>{
    return(
        <>
            <ul>
                <a href='#worksSection'>Works</a>
                <a href='#articlesSection'>Articles</a>
                <a href='#stacksSection'>Stacks</a>
                <a href='#profileSection'>Profile</a>
            </ul>
            <SignPostSVG />
        </>
    );
}