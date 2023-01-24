import React from 'react'
import { useRef } from "react"
import { Form, Modal, Button } from "react-bootstrap"

import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext"

// Composant permettant d'ajouter une dépense
export default function AddExpenseModal({
  show,
  handleClose,
  defaultBudgetId,
}) {
  // Création d'un ref pour stocker la valeur de l'input de la description
  const descriptionRef = useRef()
  // Création d'un ref pour stocker la valeur de l'input de l'amount
  const amountRef = useRef()
  // Création d'un ref pour stocker la valeur sélectionnée de l'input du budgetId
  const budgetIdRef = useRef()
  // Récupération de la fonction addExpense et de l'array budgets depuis le contexte BudgetsContext
  const { addExpense, budgets } = useBudgets()

  // Gestion de l'événement de soumission du formulaire
  function handleSubmit(e) {
    e.preventDefault()
    // Appel de la fonction addExpense avec les valeurs de description, amount et budgetId récupérées depuis les inputs
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    })
    // Appel de la fonction handleClose pour fermer la fenêtre modale
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Nouvelle dépense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Montant</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map(budget => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
