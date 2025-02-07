import logo from '../Logo-empresa.svg'

export default function ApplicationLogo(props) {
    return (
        <img src={logo} alt="Logo de la aplicación" {...props} />
    );
}
