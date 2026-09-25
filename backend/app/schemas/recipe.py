from typing import Literal

from pydantic import BaseModel, ConfigDict

Difficulty = Literal["easy", "medium", "hard"]
Cuisine = Literal["maghrebi", "mediterranean", "world"]
Category = Literal["main", "soup", "salad", "dessert", "drink"]
Localized = dict[str, str]


class IngredientOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: Localized
    quantity: float | None
    unit: str | None


class StepOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    position: int
    text: Localized
    timer_seconds: int | None


class RecipeSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    slug: str
    title: Localized
    image_url: str
    total_minutes: int
    servings: int
    difficulty: Difficulty
    cuisine: Cuisine
    category: Category
    diets: list[str]


class RecipeDetail(RecipeSummary):
    description: Localized
    prep_minutes: int
    cook_minutes: int
    calories: int | None
    ingredients: list[IngredientOut]
    steps: list[StepOut]
    is_favorite: bool = False
