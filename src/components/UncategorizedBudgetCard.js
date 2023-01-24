import React from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import BudgetCard from "./BudgetCard"

export default function UncategorizedBudgetCard(props) {
const { getBudgetExpenses } = useBudgets()
// Récupérer les dépenses qui n'ont pas de budget associé
const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
(total, expense) => total + expense.amount,
0
)
// Si il n'y a pas de dépenses non catégorisées, ne pas afficher le budget
if (amount === 0) return null
// Afficher un budget card avec le nom "non catégorisé" et le montant des dépenses non catégorisées
return <BudgetCard amount={amount} name="Non catégorisé" gray {...props} />
}