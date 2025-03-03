//Server\src\routes\recipes.ts






import express, { Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/middleware';
import Recipe from '../models/Recipe';








const router = express.Router();


router.post('/create', authMiddleware, async (req: AuthRequest, res: Response) => {
    console.log('Received request:', req.body);  
    console.log('User ID:', req.userId);  

    const { title, description, category } = req.body;

    if (!title || !description || !category) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Validate category
    const validCategories = ['breakfast', 'lunch', 'dinner', 'snack'];
    if (!validCategories.includes(category)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid category. Must be one of: breakfast, lunch, dinner, snack' 
        });
    }

    try {
        const newlyCreatedRecipe = new Recipe({
            title,
            description,
            category,
            createdBy: req.userId,
        });

        await newlyCreatedRecipe.save();
        
        // Return the created recipe
        return res.status(201).json({ 
            success: true, 
            message: 'Recipe created successfully', 
            recipe: newlyCreatedRecipe 
        });
    } catch (error) {
        console.error('Recipe creation error:', error);
        
        // More helpful error message
        if (error instanceof Error) {
            return res.status(500).json({ 
                success: false, 
                message: 'Server error creating recipe', 
                error: error.message 
            });
        }
        
        return res.status(500).json({ 
            success: false, 
            message: 'Unknown server error creating recipe' 
        });
    }
});


export default router;