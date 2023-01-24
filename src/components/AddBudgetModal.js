import React from 'react'
import { useRef } from "react"
import { Form, Modal, Button } from "react-bootstrap"

import { useBudgets } from "../contexts/BudgetsContext"

// Composant permettant d'ajouter un budget
export default function AddBudgetModal({ show, handleClose }) {
  // Création d'un ref pour stocker la valeur de l'input du nom
  const nameRef = useRef()
  // Création d'un ref pour stocker la valeur de l'input du montant maximum
  const maxRef = useRef()
  // Récupération de la fonction addBudget depuis le contexte BudgetsContext
  const { addBudget } = useBudgets()
  
  function handleSubmit(e) {
    e.preventDefault()
    // Appel de la fonction addBudget avec les valeurs de nom et max récupérées depuis les inputs
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    })
    // Appel de la fonction handleClose pour fermer la fenêtre modale
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Nouveau budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nom</Form.Label>
            {/* Input pour le nom du budget */}
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Montant maximum</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
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
