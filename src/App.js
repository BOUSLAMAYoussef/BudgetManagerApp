import React from 'react'
import { Button, Stack } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import AddBudgetModal from "./components/AddBudgetModal"
import AddExpenseModal from "./components/AddExpenseModal"
import ViewExpensesModal from "./components/ViewExpensesModal"
import BudgetCard from "./components/BudgetCard"
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard"
import TotalBudgetCard from "./components/TotalBudgetCard"
import { useState } from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext"

function App() {
  //  pour gérer l'affichage de la fenêtre modale d'ajout de budget
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  //  pour gérer l'affichage de la fenêtre modale d'ajout de dépense
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  //  pour gérer l'affichage de la fenêtre modale de visualisation de dépenses en fonction de l'ID du budget sélectionné
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  //  pour gérer l'ID du budget sélectionné lors de l'ajout d'une dépense
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  // Utilisation du contexte des budgets pour accéder aux informations de budgets et de dépenses
  const { budgets, getBudgetExpenses } = useBudgets()
  
  // Fonction pour ouvrir la fenêtre modale d'ajout de dépense en prenant en compte l'ID du budget sélectionné
  function openAddExpenseModal(budgetId) {
  setShowAddExpenseModal(true)
  setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
    
      <Container className="my-4">
      
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1   className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWkkiFC9UV_5AqPGSbA6wsumT7rUzU5npkmg&usqp=CAU" alt="hfkzjhf" width="30"></img>
          <Button variant="success" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            )
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  setViewExpensesModalBudgetId(budget.id)
                }
              />
            )
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
      
    </>
  )
}

export default App
