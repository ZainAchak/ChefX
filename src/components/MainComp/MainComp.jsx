import React,{useState,useRef, useEffect} from 'react'
import styles from './MainComp.module.css'

export default function MainComp() {
    const [ingredients, setIngredients] = useState([])
    const userInput = useRef();

    const textRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (textRef.current) {
        textRef.current.style.borderRight = 'none'; // Hide cursor after typing
      }
    }, 2000); // match duration of typing animation

    return () => clearTimeout(timer); // Cleanup
  }, []);

    // function handleUserInput(e) {
    //     e.preventDefault();
    //     const inputValue = userInput.current.value.trim();
    //     if(inputValue !== ""){
    //         setIngredients(prevIng => [...prevIng,inputValue])
    //         userInput.current.value = "";
    //         userInput.current.focus();
    //         console.log(ingredients)
    //         }
    // }

    function handleFormData(formData) {
        const userInputForm = formData.get("userInput").trim()

        // single line form data extraction
        const datA = Object.fromEntries(formData)
        console.log(datA)
        // -------------------------------------------

        // console.log(userInput)
        if(userInputForm !== ""){

            setIngredients(prevIng => [...prevIng,userInputForm.charAt(0).toUpperCase() + userInputForm.slice(1).toLowerCase()])
            userInput.current.focus();
            //console.log(ingredients)
        }
    }

    return(
        <main>
            <figure className={styles.description}>
                <figcaption className={styles.noteText}>💡</figcaption>
                <p>
                    Enter the ingredients you have <span className={styles.highlight}>🚨 At least 4</span>, and this app will use AI to suggest a recipe you can make. It's a quick, smart way to turn what's in your kitchen into a meal idea <b> NO MORE GUESS WORK</b>
                </p>
            </figure>

            <form action={handleFormData} className={styles.userInputForm}>
                <input 
                    ref={userInput}
                    type="text" 
                    name="userInput" id="gg" 
                    placeholder='e.g tomato'
                    aria-label='Add Ingredient'
                />

                <button 
                    // onClick={(e)=>handleUserInput(e)}
                    >+ Add Ingredient</button>
            </form>
            <div className={styles.addData}>
                <h1 style={{display: ingredients.length > 0 ? "block" : "none"}}>Incredients on hand: </h1>
                <ul>
                    {ingredients.map((item,index)=>(
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                {ingredients.length > 3 && <div className={styles.getRecipeContainer}>
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients</p>
                    </div>
                    <button className={styles.recipeBtn}>Get a recipe</button>
                </div>}
            </div>
        </main>
        
    )
}