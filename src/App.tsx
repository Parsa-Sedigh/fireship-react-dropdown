import React, {Props, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import {ReactComponent as ArrowIcon} from './icons/arrow.svg';
import {ReactComponent as BellIcon} from './icons/bell.svg';
import {ReactComponent as BoltIcon} from './icons/bolt.svg';
import {ReactComponent as CaretIcon} from './icons/caret.svg';
import {ReactComponent as ChevronIcon} from './icons/chevron.svg';
import {ReactComponent as CogIcon} from './icons/cog.svg';
import {ReactComponent as MessengerIcon} from './icons/messenger.svg';
import {ReactComponent as PlusIcon} from './icons/plus.svg';

/* Component composition: Write small reusable components.

props: props allows you to pass data from the parent to child similar to how you might pass an argument to a JS function. Because a
react component is just a JS function.

How we use svg icons in react? It's actually very easy to use an svg icon as a react component directly in your code.
First add an import statement which points towards the svg file in your code. Then inside {}, you say {ReactComponent as <whatever name
you want for the name of that svg icon.>}

Important: svg elements don't inherit a size by default. So you can set a fixed width and height for them in your css.

Building an animated multi-level dropdown:
The reason we're not passing the icon as a direct child of a <NavItem> like: <NavItem><svg>...</NavItem> is because some of our
<NavItem>s might have a dropdown menu and we want that dropdown menu to be the child of that <NavItem>. For example the fourth <NavItem>
which is inside <Navbar>.

Now in order to be able to open and close the dropdowns, our <NavItem> will need to have some state or in other words needs to have
some data that changes throughout the lifecycle of the app. So state: data that changes
We can manage state in react, by using a hook called useState. Calling useState() returns us 2 values and those values are returned in
an array, so we can destructure them as variables using [] (because we are destructuring an array).
The second value is the state and the second function is a function that you can use it to change the first variable(the state).
We can also set a default value of state by passing an arg to useState() . Because we want the dropdown to closed by default, we set the
initial state of open to false, by adding an arg to useState() .
Now we want the user to change the state, whenever they click on the NavItem. So I added onClick() on <a> of NavItem.
Important: So when user clicks on that <NavItem> in order to close or open the dropdown, we must flip the value of isOpen. So we must
 say: !isOpen to flip the value of isOpen , whatever it was before.

Learn: So putting a ! in front of a boolean value, gives you the opposite value of that boolean. So we can use that ! to reverse or flip the
 value of booleans and that is useful for toggeling booleans.
So now user can toggle the state of isOpen.

In NavItem, when we say: {open && props.children} it means when the open property is true then we'll show props.children and if isOpen
is false then nothing would shown there.

Anything you put INSIDE of a component as a child of that component, when you are using that component, can be reterivable using
props.children in the function of that component.

Currently, we have a fully functional single level dropdown. But we need an animated multi-level dropdown. So e need
react transition group package. It will help us to control the conditional logic for rendering multiple menus and transitioning between
those menus when they are added or removed from the application. Then import CSSTransition from that package.
Then we need to give our dropdown menu some states in order to specify which menu is currently visible*/

function App() {
  return (
     <Navbar>
         <NavItem icon={<PlusIcon className="nav__icon-svg" />} children="" />
         <NavItem icon={<BellIcon className="nav__icon-svg"/>}  children="" />
         <NavItem icon={<MessengerIcon className="nav__icon-svg"/>} children="" />
         <NavItem icon={<CaretIcon className="nav__icon-svg"/>}>
             <DropdownMenu />
         </NavItem>

     </Navbar>
  );
}

function Navbar (props: { children: React.ReactNode; }) {

  return (
      <nav className="navbar">
          <ul className="navbar__nav">{ props.children }</ul>
      </nav>
  );
}

function NavItem (props: { icon: React.ReactNode; children: any; } ) {
    const [open, setOpen] = useState(false);

    return (
        <li className="nav__item">
            <a href="#" className="nav__icon-button" onClick={() => setOpen(!open)}>{ props.icon }</a>

            {open && props.children}
        </li>
    );
}

function DropdownMenu () {
    /* active menu variable is the state or the name of the menu.
    So now we have state, then we can animate elements in or out using css transition. So let's wrap the current elements which are inside
    <div className="dropdown"> , inside CSSTransition components.
    CSSTransition needs a prop with name of in which when it is truthy, CSSTransition will render and animate its' children into the UI.
    In another words, when the activeMenu variable which is the state of dropdown equals 'main', then we want to show the children of
    <CSSTransition> inside the component.

    Also we added a second attr called unmountOnExit which completely removes the children of <CSSTransition> when they aren't active.

    Learn:
     <CSSTransition> looks for the first child element of it which is that <div> , then when the in attr of <CSSTransition> changes,
     <CSSTransition> will add or remove css classes to that first child, based on the state of the animation.
     Also <CSSTransition> uses the classNames attr to prefix those classes.

     CSSTransition actually doesn't animate anything */
    const [activeMenu, setActiveMenu] = useState('main');

    function DropdownItem (props: { leftIcon: React.ReactNode; children: React.ReactNode; rightIcon: React.ReactNode; }) {
        /* We passed props to use props.children in order to control the text of the link.
        Now, some of the links have an icon on the left and some of them have icon on their right. We can handle that logic in a
        flexible way by adding slots for a left icon and a right icon. So when you pass in a left icon or a right icon prop, it will
        be rendered, But if you leave one or both of them blank, then this component won't render them at all. Those icons would be
        rendered in these 2 <span> elements (IF we pass this component any icons...)

        When you want to use this DropdownItem component, will take some text as it's children property(so props.children on the
        declaration of this component, would be the text that we used inside of instance of this component.). But if you want to show an
        icon on the left or right or both of this component, you can pass leftIcon or rightIcon as an attr when instantiating this
        component. For icon, we can pass another component or even emoji string or ... .*/
        return (
            <a href="#" className="dropdown__menu-item">
                <span className="nav__icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="dropdown__icon-right nav__icon-button">{props.rightIcon}</span>
            </a>
        );
    }

    return (
        <div className="dropdown">
            <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary">
                <div className="dropdown__menu">
                    <DropdownItem leftIcon={<CogIcon />} rightIcon={<ChevronIcon />}>My Profile</DropdownItem>
                    <DropdownItem leftIcon={<CogIcon />} rightIcon={<ChevronIcon />}>Settings</DropdownItem>
                </div>
            </CSSTransition>
        </div>
    );
}

export default App;
