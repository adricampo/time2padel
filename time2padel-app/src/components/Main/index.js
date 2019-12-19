import React from 'react'
import './index.sass'

export default function ({}) {
    return <>
            <main className="main">
                <section className="main__welcome welcome">
                    <h2 className="welcome__title">Welcome</h2>
                </section>
                <section className="main__news news">
                    <article className="news__new new"><a href="https://www.worldpadeltour.com/">
                        <h2 className="new__title">About WPT</h2>
                        <img className="new__img" src={process.env.PUBLIC_URL + '/img/main2.jpeg'}/>
                        {/* <p className="new__text">Have a look to the oficial site! Check information about championships, results, information.. about the best players in the world!</p> */}
                    </a></article>
                   <article className="news__new new"><a href="https://www.bullpadel.com/es/">
                        <h2 className="new__title">New Colab</h2>
                        <img className="new__img" src={process.env.PUBLIC_URL + '/img/bullpadel-logo.png'}/>
                        {/* <p className="new__text">Agreement with Bullpadel, we finally closed a contract with them. Very soon we will start selling their products in our shop.</p> */}
                    </a></article>
                </section>
                <section className="main__speech speech">
                    <div className="speech__title">Find here all the info you need</div>
                    <div className="speech__description">Keep informed of the news, check your results, join our leagues and more!
                    </div>
                </section>
            </main>
    </>
}