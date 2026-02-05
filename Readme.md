# 📊 Évaluation de Criticité Projet – Modèle par Axes Pondérés

## 1. Contexte

Dans un environnement multi-projets avec des ressources Qualité limitées, il est essentiel de **prioriser les projets selon leur niveau réel de criticité** afin d’adapter la gouvernance et le niveau de support Qualité.

Cet outil permet de :

* Évaluer la **criticité globale d’un projet** de manière structurée
* Classer les projets selon **3 niveaux de risque**
* Définir automatiquement les **exigences de gouvernance et de pilotage Qualité**
* Fournir une base **objective, traçable et audit-proof** (ISO, audits clients, revues management)

---

## 2. Principe général

L’évaluation repose sur :

* **4 axes de risque**
* **12 critères au total**
* Une **pondération par axe**
* Un calcul de criticité basé sur une **moyenne par axe**

> **Criticité globale = Σ (Score Axe × Pondération)**

---

## 3. Axes, critères et pondérations

### 🔹 AXE 1 — Criticité stratégique (pondération 1,5)

| Critère                       | Niveaux                           |
| ----------------------------- | --------------------------------- |
| Importance business           | 1=Faible · 2=Moyenne · 3=Critique |
| Visibilité / impact image     | 1=Faible · 2=Moyenne · 3=Forte    |
| Dépendance à d’autres projets | 1=Aucune · 2=Partielle · 3=Forte  |

---

### 🔹 AXE 2 — Complexité technique (pondération 1,3)

| Critère                  | Niveaux                                         |
| ------------------------ | ----------------------------------------------- |
| Complexité architecture  | 1=Faible · 2=Moyenne · 3=Forte                  |
| Maturité technologique   | 1=Maîtrisée · 2=Partielle · 3=Faible / nouvelle |
| Intégration / interfaces | 1=Simples · 2=Multiples · 3=Critiques           |

---

### 🔹 AXE 3 — Risque projet (pondération 1,2)

| Critère                | Niveaux                            |
| ---------------------- | ---------------------------------- |
| Risque planning        | 1=Faible · 2=Moyen · 3=Élevé       |
| Risque coût            | 1=Faible · 2=Moyen · 3=Élevé       |
| Contraintes normatives | 1=Aucune · 2=Standard · 3=Critique |

---

### 🔹 AXE 4 — Risque organisationnel & client (pondération 1,0)

| Critère                               | Niveaux                                          |
| ------------------------------------- | ------------------------------------------------ |
| Taille & dispersion équipe            | 1=Petite/stable · 2=Moyenne · 3=Large/distribuée |
| Disponibilité client                  | 1=Forte · 2=Moyenne · 3=Faible                   |
| Coopération / stabilité décisionnelle | 1=Coopératif · 2=Variable · 3=Résistant          |

---

## 4. Méthode de calcul

### 4.1 Score par axe

```
Score Axe = (Somme des critères de l’axe) / 3
```

👉 Valeur comprise entre **1 et 3**

### 4.2 Criticité globale

```
Criticité globale = Σ (Score Axe × Pondération Axe)
```

### 4.3 Plage de score

* **Minimum** : 5,00
* **Maximum** : 15,00

Le score est affiché avec **2 décimales**.

---

## 5. Mapping Criticité → Gouvernance

### Seuils de classification

| Score global         | Niveau |
| -------------------- | ------ |
| < 8,33               | Faible |
| 8,33 ≤ score < 11,67 | Moyen  |
| ≥ 11,67              | Élevé  |

---

### Gouvernance associée

| Niveau    | Classe projet   | Exigences associées                                                                      |
| --------- | --------------- | ---------------------------------------------------------------------------------------- |
| 🟢 Faible | Projet simple   | Pilotage standard, QA léger (en cas de besoins sur demande CDP / Manager ponctuellement) |
| 🟠 Moyen  | Projet sensible | Jalons qualité, gestion des risques formalisée                                           |
| 🔴 Élevé  | Projet critique | Gouvernance renforcée, validation indépendante, reporting comité                         |

---

## 6. Résultats fournis par l’outil

L’outil génère automatiquement :

### 📌 Score global

* Valeur numérique (ex : **10,25 / 15**)
* Badge visuel (Vert / Orange / Rouge)

### 📌 Classe projet & gouvernance

* Projet simple / sensible / critique
* Exigences associées affichées explicitement

### 📌 Détail par axe

* Score moyen par axe
* Pondération appliquée
* Contribution au score global

### 📌 Points de vigilance

* Liste automatique des **critères notés 3**
* Regroupés par axe
* Triés par niveau de risque

---

## 7. Fonctionnalités clés

* ✅ Calcul **100 % automatique** (aucun bouton « Calculer »)
* 🔄 Réinitialisation complète du formulaire
* 📤 Export CSV (Excel-compatible) incluant :

  * Infos projet
  * Valeurs des 12 critères
  * Scores par axe
  * Score global
  * Niveau de criticité
  * Classe projet
  * Gouvernance associée
* 🖨️ Impression / export PDF
* 📱 Responsive (PC, tablette, mobile)

---

## 8. Utilisation recommandée

1. Le chef de projet renseigne les critères
2. Le score et la classe sont calculés automatiquement
3. La gouvernance Qualité est définie
4. La décision est :

   * **Objective**
   * **Traçable**
   * **Justifiable en audit**

👉 Mise à jour recommandée :

* À chaque jalon projet majeur
* Ou trimestriellement

---

## 9. Bénéfices organisationnels

✔ Harmonisation des pratiques de classification projet
✔ Allocation des ressources Qualité basée sur le risque
✔ Support à la décision pour le management
✔ Vision claire du portefeuille projets
✔ Alignement avec une approche **Risk-Based Governance**

---

## 10. Limites & évolutions possibles

### Limites

* Données déclaratives
* Ne remplace pas l’expertise terrain

### Évolutions possibles

* Connexion SharePoint / Forms
* Historique multi-projets
* Dashboard portefeuille (Power BI)
* Ajustement des pondérations par type de projet

---

## 11. Auteur

**Auteur :** Dhafer Bouthelja
**Année :** 2026
**Contexte :** Pilotage Qualité Projets – Gouvernance basée sur le risque

