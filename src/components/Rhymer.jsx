import { useState,useEffect } from 'react';
import scheme from './rhymingScheme'
import './Rhymer.css'


const f=[{"word":"be","score":11335,"numSyllables":1,"tags":["f:1665.648031"]},{"word":"sea","score":4730,"numSyllables":1,"tags":["f:87.002513"]},{"word":"key","score":4510,"numSyllables":1,"tags":["f:80.465389"]},{"word":"see","score":4384,"numSyllables":1,"tags":["f:781.909629"]},{"word":"me","score":3632,"numSyllables":1,"tags":["f:751.381852"]},{"word":"free","score":3517,"numSyllables":1,"tags":["f:166.545187"]},{"word":"c","score":3378,"numSyllables":1,"tags":["f:219.664970"]},{"word":"flee","score":3107,"numSyllables":1,"tags":["f:3.800193"]},{"word":"hyperbole","score":2818,"numSyllables":4,"tags":["f:0.596505"]},{"word":"tea","score":2779,"numSyllables":1,"tags":["f:22.524357"]},{"word":"e","score":2731,"numSyllables":1,"tags":["f:128.850345"]},{"word":"b","score":2501,"numSyllables":1,"tags":["f:230.315174"]},{"word":"guarantee","score":2461,"numSyllables":3,"tags":["f:13.440150"]},{"word":"d","score":2385,"numSyllables":1,"tags":["f:143.264467"]},{"word":"bee","score":2376,"numSyllables":1,"tags":["f:4.534421"]},{"word":"degree","score":2360,"numSyllables":2,"tags":["f:86.725813"]},{"word":"foresee","score":2343,"numSyllables":2,"tags":["f:1.807522"]},{"word":"pea","score":2063,"numSyllables":1,"tags":["f:1.986154"]},{"word":"tv","score":1991,"numSyllables":2,"tags":["f:19.486628"]},{"word":"reality","score":1948,"numSyllables":4,"tags":["f:67.115688"]},{"word":"v","score":1933,"numSyllables":1,"tags":["f:73.531837"]},{"word":"debris","score":1910,"numSyllables":2,"tags":["f:5.842211"]},{"word":"lee","score":1890,"numSyllables":1,"tags":["f:24.787104"]},{"word":"agree","score":1844,"numSyllables":2,"tags":["f:33.931935"]},{"word":"t","score":1844,"numSyllables":1,"tags":["f:113.777788"]},{"word":"fee","score":1804,"numSyllables":1,"tags":["f:13.096447"]},{"word":"ski","score":1755,"numSyllables":1,"tags":["f:3.111986"]},{"word":"oversee","score":1719,"numSyllables":3,"tags":["f:1.372660"]},{"word":"p","score":1715,"numSyllables":1,"tags":["f:368.475826"]},{"word":"decree","score":1683,"numSyllables":2,"tags":["f:7.543074"]},{"word":"g","score":1568,"numSyllables":1,"tags":["f:61.519239"]},{"word":"z","score":1535,"numSyllables":1,"tags":["f:19.651370"]},{"word":"de","score":1461,"numSyllables":1,"tags":["f:312.151395"]},{"word":"plea","score":1448,"numSyllables":1,"tags":["f:5.146108"]},{"word":"idiosyncrasy","score":1430,"numSyllables":6,"tags":["f:0.313882"]},{"word":"marquee","score":1379,"numSyllables":2,"tags":["f:0.449929"]},{"word":"apogee","score":1357,"numSyllables":3,"tags":["f:0.456858"]},{"word":"snee","score":1352,"numSyllables":1,"tags":["f:0.022951"]},{"word":"three","score":1336,"numSyllables":1,"tags":["f:406.714840"]},{"word":"quay","score":1250,"numSyllables":1,"tags":["f:1.182223"]},{"word":"tee","score":1228,"numSyllables":1,"tags":["f:1.942396"]},{"word":"we","score":1209,"numSyllables":1,"tags":["f:1756.293820"]},{"word":"wee","score":1206,"numSyllables":1,"tags":["f:2.038629"]},{"word":"nee","score":1204,"numSyllables":1,"tags":["f:1.692492"]},{"word":"glee","score":1175,"numSyllables":1,"tags":["f:1.098841"]},{"word":"syncope","score":1174,"numSyllables":3,"tags":["f:0.989373"]},{"word":"he","score":1137,"numSyllables":1,"tags":["f:3412.619847"]},{"word":"qi","score":1098,"numSyllables":1,"tags":["f:1.539800"]},{"word":"gee","score":1093,"numSyllables":1,"tags":["f:1.648647"]},{"word":"spree","score":1087,"numSyllables":1,"tags":["f:0.554990"]},{"word":"pony","score":1086,"numSyllables":2,"tags":["f:2.350442"]},{"word":"sunday","score":1047,"numSyllables":2,"tags":["f:25.098005"]},{"word":"lea","score":1041,"numSyllables":1,"tags":["f:2.641614"]},{"word":"referee","score":1007,"numSyllables":3,"tags":["f:1.049264"]},{"word":"knee","score":979,"numSyllables":1,"tags":["f:12.935716"]},{"word":"pre","score":972,"numSyllables":1,"tags":["f:37.451233"]},{"word":"jubilee","score":953,"numSyllables":3,"tags":["f:1.654450"]},{"word":"pee","score":953,"numSyllables":1,"tags":["f:0.902760"]},{"word":"xi","score":947,"numSyllables":1,"tags":["f:10.168056"]},{"word":"flea","score":893,"numSyllables":1,"tags":["f:1.114206"]},{"word":"emcee","score":892,"numSyllables":2,"tags":["f:0.091425"]},{"word":"thee","score":890,"numSyllables":1,"tags":["f:16.950526"]},{"word":"repartee","score":883,"numSyllables":3,"tags":["f:0.283451"]},{"word":"scree","score":847,"numSyllables":1,"tags":["f:0.232946"]},{"word":"kabuki","score":837,"numSyllables":3,"tags":["f:0.429269"]},{"word":"actuary","score":835,"numSyllables":4,"tags":["f:0.154119"]},{"word":"turnkey","score":830,"numSyllables":2,"tags":["f:0.287030"]},{"word":"dee","score":823,"numSyllables":1,"tags":["f:2.286820"]},{"word":"yee","score":817,"numSyllables":1,"tags":["f:0.406167"]},{"word":"ghee","score":814,"numSyllables":1,"tags":["f:0.570624"]},{"word":"cree","score":813,"numSyllables":1,"tags":["f:0.774114"]},{"word":"mi","score":810,"numSyllables":1,"tags":["f:11.117436"]},{"word":"partee","score":803,"numSyllables":2,"tags":["f:0.078237"]},{"word":"precis","score":796,"numSyllables":2,"tags":["f:0.379018"]},{"word":"hee","score":795,"numSyllables":1,"tags":["f:0.964003"]},{"word":"di","score":784,"numSyllables":1,"tags":["f:22.402251"]},{"word":"asap","score":783,"numSyllables":4,"tags":["f:0.198840"]},{"word":"ne","score":783,"numSyllables":1,"tags":["f:11.969517"]},{"word":"bourgeoisie","score":782,"numSyllables":3,"tags":["f:4.529403"]},{"word":"payee","score":756,"numSyllables":2,"tags":["f:0.322734"]},{"word":"calliope","score":749,"numSyllables":4,"tags":["f:0.153381"]},{"word":"cc","score":748,"numSyllables":2,"tags":["f:6.185034"]},{"word":"carefree","score":745,"numSyllables":2,"tags":["f:0.940866"]},{"word":"hawaii","score":736,"numSyllables":3,"tags":["f:6.002339"]},{"word":"trustee","score":734,"numSyllables":2,"tags":["f:3.661399"]},{"word":"guaranty","score":730,"numSyllables":3,"tags":["f:0.542508"]},{"word":"nestle","score":728,"numSyllables":2,"tags":["f:0.462400"]},{"word":"si","score":725,"numSyllables":1,"tags":["f:19.910470"]},{"word":"banshee","score":712,"numSyllables":2,"tags":["f:0.149013"]},{"word":"esprit","score":709,"numSyllables":2,"tags":["f:1.317406"]},{"word":"lessee","score":709,"numSyllables":2,"tags":["f:0.840023"]},{"word":"ac","score":708,"numSyllables":2,"tags":["f:9.851300"]},{"word":"marquis","score":708,"numSyllables":2,"tags":["f:3.253321"]},{"word":"ree","score":689,"numSyllables":1,"tags":["f:0.639906"]},{"word":"potpourri","score":685,"numSyllables":3,"tags":["f:0.209911"]},{"word":"she","score":678,"numSyllables":1,"tags":["f:1336.366781"]},{"word":"machete","score":677,"numSyllables":3,"tags":["f:0.401751"]},{"word":"ve","score":669,"numSyllables":1,"tags":["f:8.277874"]},{"word":"indri","score":661,"numSyllables":2,"tags":["f:0.020002"]},{"word":"manatee","score":661,"numSyllables":3,"tags":["f:0.167358"]}]

export default function Rhymer(props){
    const {rhymes,active} = props;
    // const [data,setData] =useState("");
    const [data,setData] =useState(f);

    // useEffect(() => {
    //     const controller = new AbortController();
    //     const { signal } = controller;
    //     const word=rhymes[scheme[active]];
    //     if(word){
    //     fetch(`https://api.datamuse.com/words?rel_rhy=${word}`, { signal }).then( response =>{
    //         response.json().then(words => {
    //             setData(words);
    //         });
    //     })
    //     }
    // return () => {
    //     controller.abort();
    //     };    
    // }, [rhymes,active]);
    return (
      <div className="container">
        {data && (
          <>
        <p>Your Word</p>
        <ul className="list rhymes">
          {data.map((item,i) => (
            <li key={`r${i}`}>{item.word}</li>
            ))}
        </ul>
      </>
      )}
      </div>
    );
};