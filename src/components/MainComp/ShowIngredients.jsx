import styles from './MainComp.module.css'


export default function ShowIngredients({ingredients,handleAI}) {
    return (
        <>
            <div 
                style={{display: ingredients.length > 0 ? "block" : "none"}} 
                className={styles.titleAndUl}>
                    <h1>
                            Incredients on hand: 
                    </h1>
                    
                    <ul>
                        {ingredients.map((item,index)=>(
                                    <li key={index}>{item}</li>
                        ))}
                    </ul>
            </div>            
                {ingredients.length > 3 && <div className={styles.getRecipeContainer}>

                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients</p>
                    </div>

                    <button 
                        onClick={()=> {handleAI()}} 
                        className={styles.recipeBtn}>
                            {"Get a recipe"}
                    </button>
                </div>}
        
        </>
    )
}