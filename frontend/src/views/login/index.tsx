import React from 'react'
import containerStyle from 'assets/css/modules/container.module.css'
import style from './style.module.scss'

function Login() {

  // -------------------------------------------------
	// Classnames
	// -------------------------------------------------
	const { logo } = style;
	const page = `${style.loginPageContainer} ${style.pageGrid} ${style.backgroundImage}`;
	const card = `${containerStyle.accessFormCard} ${style.formCard}`;
	const footer = `${containerStyle.footerSignature} ${style.loginFooter}`;

  return (
    <div className={page}>
			<div className={logo}>
				<Logo />
			</div>
			<div className={card}>
				{isFirstAccess ? (
					<FirstAccessForm userCredentials={userCredentials} />
				) : (
					<RegularAccessForm
						setUserCredentials={(values) => onFetchFirstLogin(values)}
					/>
				)}
			</div>
			<footer className={footer}>
				Desenvolvido por Seidor Brasil. Conheça nossos serviços em
				<a href="https://www.seidor.com.br"> www.seidor.com.br</a>
			</footer>
		</div>
  )
}

export default Login
