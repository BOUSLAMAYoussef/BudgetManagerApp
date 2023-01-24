import React from 'react'
import { useBudgets } from "../contexts/BudgetsContext"
import BudgetCard from "./BudgetCard"

export default function TotalBudgetCard() {
// Récupère les données de dépenses et de budgets à partir du contexte
const { expenses, budgets } = useBudgets()
// Calcule la somme totale des dépenses
const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
// Calcule la somme totale des budgets
const max = budgets.reduce((total, budget) => total + budget.max, 0)
// Si aucun budget n'est défini, on ne rend rien
if (max === 0) return null
// On rend un composant BudgetCard avec le montant total des dépenses, le nom "Total", en gris, et avec max = la somme totale des budgets, sans boutons
return <BudgetCard amount={amount} name="Total" gray max={max} hideButtons />
}