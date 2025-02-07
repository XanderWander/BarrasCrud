import Logo from '../Logo-empresa.svg'

export default function ApplicationLogo(props) {
    return (
        <img src={Logo} alt="Logo de la aplicación" {...props} />
    );
}
