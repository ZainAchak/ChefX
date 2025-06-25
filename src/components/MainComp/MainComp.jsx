import React,{useState,useRef, useEffect} from 'react'
import styles from './MainComp.module.css'
import ShowRecipe from './ShowRecipe';
import ShowIngredients from './ShowIngredients';
import { getRecipeFromMistral } from './ai';

export default function MainComp() {
    const [ingredients, setIngredients] = useState([])
    const [recipeShow, setrecipeShow] = useState(false);
    const [aiRecipe, setAiRecipe] = useState();
    const [showLoading,setShowloading] = useState(false);
    const userInput = useRef();
    const recipeRef = useRef(null);
    const loaderRef = useRef(null);


    async function handleAI() {
        setShowloading(true);
        setAiRecipe(await getRecipeFromMistral(ingredients))
        setShowloading(false)
        if (!recipeShow){
            setrecipeShow(!recipeShow);
        }
    }

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

    useEffect(()=>{
        if(showLoading){
            loaderRef.current.scrollIntoView({ behavior: 'smooth' });
            }
    },[showLoading])

    useEffect(() => {
            if (recipeShow && recipeRef.current) {
                recipeRef.current.scrollIntoView({ behavior: 'smooth' });  
            }
        }, [recipeShow,aiRecipe]);

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
                <ShowIngredients 
                    ingredients={ingredients} 
                    setrecipeShow={setrecipeShow} 
                    recipeShow={recipeShow}
                    handleAI={handleAI}/>

                {showLoading && <div ref={loaderRef} className={styles.loader}></div>}

                <ShowRecipe 
                    recipeShow={recipeShow} 
                    recipeRef={recipeRef}
                    aiRecipe={aiRecipe}/>
                
            </div>
        </main>
        
    )
}