const axios = require('axios');

// Exemple de questions précédentes et de catégorie de quiz
const previousQuestions = [1, 2, 3]; // Remplacez par vos identifiants de questions précédentes
const quizCategory = { id: 1, type: 'Science' }; // Remplacez par votre catégorie de quiz

axios.post('http://localhost:5000/quizzes', {
  previous_questions: previousQuestions,
  quiz_category: quizCategory
})
.then(response => {
  console.log('Response:', response.data);
  // Mettez à jour l'état de votre composant React avec les données reçues
})
.catch(error => {
  console.error('Error:', error);
  // Gérer les erreurs
});
