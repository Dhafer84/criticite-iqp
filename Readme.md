# 📊 Évaluation de Criticité Projet – Décision IQP

## 1. Contexte et objectif

Dans un contexte où plusieurs projets sont menés en parallèle et où les ressources Qualité sont limitées, il est nécessaire de **prioriser l’affectation des Ingénieurs Qualité Projet (IQP)** de manière **objective, traçable et basée sur le risque**.

Cet outil permet :

* D’évaluer la **criticité globale d’un projet**
* De **classer les projets** selon leur niveau de risque
* De **déterminer automatiquement** le niveau de support Qualité requis :

  * Qualité transverse
  * IQP partagé
  * IQP dédié

---

## 2. Description générale de l’outil

L’outil est une **page HTML autonome** (un seul fichier) intégrant :

* Un formulaire de saisie projet
* Un système de **scoring automatique**
* Des **règles de décision Qualité**
* Une restitution visuelle claire (score, classe, décision)
* Des fonctions d’export et d’impression

👉 **Aucune installation requise**
👉 Fonctionne **hors ligne**, directement dans un navigateur

---

## 3. Critères de criticité pris en compte

L’évaluation est basée sur **7 critères**, chacun noté de **1 (faible)** à **5 (critique)**.

| # | Critère                           | Description                            |
| - | --------------------------------- | -------------------------------------- |
| 1 | Criticité produit / sécurité      | Impact sécurité, réglementaire, client |
| 2 | Client & exigences contractuelles | Niveau d’exigence, audits, pénalités   |
| 3 | Complexité technique              | Technologie, innovation, intégration   |
| 4 | Maturité de l’équipe              | Expérience, stabilité, turnover        |
| 5 | Historique qualité                | NC, réclamations, escalades            |
| 6 | Pression planning                 | Délais, marge, urgence                 |
| 7 | Nombre de ressources              | Taille de l’équipe, multi-équipes      |

### Bonus organisationnel

* **Projet multi-sites : +1 point**

👉 **Score maximum : 36**

---

## 4. Règles de calcul du score

```
Score total = Somme des 7 critères (1 à 5)
            + Bonus multi-sites (0 ou 1)
```

Le score est :

* Calculé **automatiquement**
* Mis à jour **en temps réel**
* Affiché de façon visuelle (jauge + valeur numérique)

---

## 5. Classes de criticité et décision Qualité

| Classe     | Score   | Décision                             |
| ---------- | ------- | ------------------------------------ |
| 🟢 Faible  | ≤ 12    | Qualité transverse (pas d’IQP dédié) |
| 🟠 Moyenne | 13 – 21 | IQP partagé / part-time recommandé   |
| 🔴 Haute   | ≥ 22    | IQP dédié obligatoire                |

---

## 6. Règle bloquante (prioritaire)

Indépendamment du score global :

> 🚨 **Si au moins un critère = 5**, alors
> **IQP dédié obligatoire**

Cette règle permet de couvrir :

* Projets safety / réglementés
* Clients stratégiques
* Projets à forte charge humaine
* Contextes qualité à risque élevé

---

## 7. Analyse automatique fournie

L’outil génère automatiquement :

### 🔎 Points de vigilance

* Liste des critères avec une note **≥ 4**
* Mise en évidence des zones à risque

### 🚨 Alerte règle bloquante

* Indication claire si la règle bloquante est déclenchée
* Justification explicite

---

## 8. Fonctionnalités principales

### ✅ Calcul automatique

* Aucun bouton « Calculer »
* Mise à jour instantanée à chaque modification

### 📤 Export CSV

* Export des données suivantes :

  * Date
  * Projet / Client / Chef de projet / BU
  * Notes des 7 critères
  * Multi-sites
  * Score total
  * Classe
  * Décision Qualité
* Compatible Excel (UTF-8)

### 🖨️ Impression / PDF

* Mise en page optimisée pour impression
* Utilisable en revue projet / audit / comité

### 🔄 Réinitialisation

* Remise à zéro complète du formulaire
* Valeurs par défaut = 3 (criticité moyenne)

---

## 9. Bénéfices pour l’organisation

✔ Allocation IQP **basée sur le risque**
✔ Décisions **objectives et justifiables**
✔ Outil **audit-proof** (ISO / ASPICE / client)
✔ Meilleure visibilité du portefeuille projets
✔ Harmonisation des pratiques Qualité

---

## 10. Limites et évolutions possibles

### Limites

* Évaluation basée sur des données déclaratives
* Ne remplace pas le jugement expert

### Évolutions possibles

* Connexion à SharePoint List
* Historique multi-projets
* Dashboard global portefeuille
* Pondération différente par type de projet

---

## 11. Auteur et contexte

**Auteur :** Dhafer Bouthelja
**Contexte :** Pilotage Qualité Projets / Allocation IQP
**Année :** 2026

---

