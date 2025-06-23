import React,{useState,useRef} from 'react'
import styles from './MainComp.module.css'

export default function MainComp() {
    const [ingredients, setIngredients] = useState([])
    const userInput = useRef();

    function handleUserInput(e) {
        e.preventDefault();
        const inputValue = userInput.current.value.trim();
        if(inputValue !== ""){
            setIngredients(prevIng => [...prevIng,inputValue])
            userInput.current.value = "";
            userInput.current.focus();
            console.log(ingredients)
            }
    }

    return(
        <main>
            <figure className={styles.description}>
                <figcaption className={styles.noteText}>💡</figcaption>
                <p>
                    Enter the ingredients you have, and this app will use AI to suggest a recipe you can make. It's a quick, smart way to turn what's in your kitchen into a meal idea <b> NO MORE GUESS WORK</b>
                </p>
            </figure>

            <form className={styles.userInputForm}>
                <input 
                    ref={userInput}
                    type="text" 
                    name="" id="gg" 
                    placeholder='e.g tomato'
                    aria-label='Add Ingredient'
                />

                <button 
                    onClick={(e)=>handleUserInput(e)}
                    >+ Add Ingredient</button>
            </form>
            <div className={styles.addData}>
                <h1 style={{display: ingredients.length > 0 ? "block" : "none"}}>Incredients on hand: </h1>
                <ul>
                    {ingredients.map((item,index)=>(
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </main>
    )
}