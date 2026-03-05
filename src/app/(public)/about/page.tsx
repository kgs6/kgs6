import Footer from "@/components/shared/footer";

function About() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="px-10 py-4 w-full lg:max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold">Про компанію</h1>
                <p className="mt-4 text-lg">
                    Приватне Акціонерне Товариство &quot;ТРЕСТ КИЇВМІСЬКБУД-6&quot; - виробничо- будівельне підприємство, що створене в лютому 1961 року, має досвід успішної реалізації проектів будь-якої складності протягом 50 років.
                </p>
                <p className="mt-4 text-lg">
                    За цей час Трестом зведено близько 1600 об’єктів: заводи, фабрики, автотранспортні підприємства, житлові комплекси, комерційна нерухомість, школи, лікарні.
                </p>
                <p className="mt-4 text-lg">
                    Наявність найсучаснішої виробничо-технічної бази, оновленого висококваліфікованого інженерного персоналу надає можливість ПрАТ &quot;ТРЕСТ КИЇВМІСЬКБУД-6&quot; виконувати роботи як з будівництва об&apos;єктів житлового сектору, офісних центрів, торгово-розважальних центрів, так і об’єктів промислового призначення .
                </p>
                <p className="mt-4 text-lg">
                    Одним із основних напрямків стратегічного розвитку компанії, що реалізується останніми роками, є створення нової якісної системи управління підприємством, системи прозорості діяльності згідно з міжнародними стандартами:
                </p>

                <ul className="space-y-2 mt-4 ml-4 text-lg">
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>відкритість у відносинах з інвесторами</span>
                    </li>

                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>прозорість ціноутворення</span>
                    </li>

                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>система контролю використання коштів</span>
                    </li>

                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>прозорість у відносинах з субпідрядними організаціями</span>
                    </li>

                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>прозорість податкових відносин</span>
                    </li>

                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>система контролю за якістю БМР та строками виконання робіт</span>
                    </li>
                </ul>

                <p className="mt-4 text-lg">
                    На сьогоднішній день ПрАТ &quot;ТРЕСТ КИЇВМІСЬКБУД-6&quot; вирізняє схильність до інтелектуальних розробок, новацій і інноваційних рішень.
                </p>
                <p className="mt-4 text-lg">
                    Розвиток сучасного фінансово-будівельного комплексу неможливий без власних виробничих потужностей. Тому на сьогоднішній день в склад Тресту входить базове управління виробничо-технічної комплектації (УВТК), що включає:
                </p>

                <ul className="space-y-2 mt-4 ml-4 text-lg">
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>виробничий цех з виготовлення металоконструкцій</span>
                    </li>

                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>цех з виготовлення виробів із дерева</span>
                    </li>

                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>цех з виготовлення металопластикових вікон та дверей, оснащений обладнанням провідного світового виробника Elumatec (Німеччина)</span>
                    </li>

                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>пилорама</span>
                    </li>
                </ul>

                <p className="mt-4 text-lg">
                    Також ПрАТ &quot;ТРЕСТ КИЇВМІСЬКБУД-6&quot; володіє парком вантажно-підйомного обладнання, необхідними механізмами, що у комплексі можуть забезпечити виконання всіх будівельних робіт на об’єкті.
                </p>
            </main>
            <Footer />
        </div>
    );
}

export default About;