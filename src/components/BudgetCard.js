import React from 'react'
import { Button, Card, ProgressBar, Stack } from "react-bootstrap"
import { currencyFormatter } from "../utils"

// Composant affichant un budget avec son nom, son montant, son maximum et ses boutons d'action
export default function BudgetCard({
  name, // nom du budget
  amount, // montant actuel du budget
  max, // montant maximum du budget
  gray, // boolean définissant si la carte doit avoir un fond gris
  hideButtons, // boolean définissant si les boutons d'action doivent être cachés
  onAddExpenseClick, // fonction appelée lorsque le bouton "Ajouter une dépense" est cliqué
  onViewExpensesClick, // fonction appelée lorsque le bouton "Voir les dépenses" est cliqué
}) {
  const classNames = []
  // Si le montant actuel dépasse le maximum, ajouter les classes CSS pour un fond rouge
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10")
  } 
  // Si gray est vrai, ajouter la classe CSS pour un fond gris
  else if (gray) {
    classNames.push("bg-light")
  }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)} // détermine la couleur de la barre de progression en fonction du ratio montant/maximum
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick} // appelle la fonction passée en propriété
            >
              <em>Add Expense</em>
            </Button>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWkkiFC9UV_5AqPGSbA6wsumT7rUzU5npkmg&usqp=CAU" alt="hfkzjhf" width="30"></img>
            <Button onClick={onViewExpensesClick} variant="outline-success">
              <em>View Expenses</em>
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  )
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max
  if (ratio < 0.5) return "primary"
  if (ratio < 0.75) return "warning"
  return "danger"
}
