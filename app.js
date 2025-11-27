const { useState, useEffect } = React;

const Calculator = () => {
  const LucideCalculator = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <line x1="8" y1="6" x2="16" y2="6"/>
      <line x1="16" y1="14" x2="16" y2="18"/>
      <path d="M16 10h.01"/>
      <path d="M12 10h.01"/>
      <path d="M8 10h.01"/>
      <path d="M12 14h.01"/>
      <path d="M8 14h.01"/>
      <path d="M12 18h.01"/>
      <path d="M8 18h.01"/>
    </svg>
  );

  const [grades, setGrades] = useState({
    asd3: { td: '', tp: '', examen: '' },
    poo1: { tp: '', examen: '' },
    si: { td: '', examen: '' },
    alg3: { td: '', examen: '' },
    am3: { td: '', examen: '' },
    prob2: { td: '', examen: '' },
    entrep: { examen: '' }
  });

  const [results, setResults] = useState({});

  const subjects = [
    { 
      key: 'asd3', 
      name: 'Algorithmique et structure de données 3', 
      coef: 4, 
      hasTD: true,
      hasTP: true,
      ue: 'UEF 3.1'
    },
    { 
      key: 'poo1', 
      name: 'Programmation orientée objet 1', 
      coef: 4, 
      hasTD: false,
      hasTP: true,
      ue: 'UEF 3.1'
    },
    { 
      key: 'si', 
      name: "Introduction aux Systèmes d'information", 
      coef: 3, 
      hasTD: true,
      hasTP: false,
      ue: 'UEF 3.1'
    },
    { 
      key: 'alg3', 
      name: 'Algèbre 3', 
      coef: 3, 
      hasTD: true,
      hasTP: false,
      ue: 'UEF 3.2'
    },
    { 
      key: 'am3', 
      name: 'Analyse mathématique 3', 
      coef: 3, 
      hasTD: true,
      hasTP: false,
      ue: 'UEF 3.2'
    },
    { 
      key: 'prob2', 
      name: 'Probabilités et statistiques 2', 
      coef: 2, 
      hasTD: true,
      hasTP: false,
      ue: 'UEM 3.1'
    },
    { 
      key: 'entrep', 
      name: 'Entreprenariat', 
      coef: 1, 
      hasTD: false,
      hasTP: false,
      ue: 'UET 3.1'
    }
  ];

  const calculateAverage = () => {
    let totalWeightedGrade = 0;
    let totalCoef = 0;
    const subjectResults = {};

    subjects.forEach(subject => {
      const grade = grades[subject.key];
      const td = parseFloat(grade.td) || 0;
      const tp = parseFloat(grade.tp) || 0;
      const examen = parseFloat(grade.examen) || 0;

      let continu = 0;
      let count = 0;
      
      if (subject.hasTD) {
        continu += td;
        count++;
      }
      if (subject.hasTP) {
        continu += tp;
        count++;
      }
      
      if (count > 0) {
        continu = continu / count;
      }

      let finalGrade;
      if (subject.hasTD || subject.hasTP) {
        finalGrade = (continu * 0.4) + (examen * 0.6);
      } else {
        finalGrade = examen;
      }

      subjectResults[subject.key] = finalGrade.toFixed(2);
      totalWeightedGrade += finalGrade * subject.coef;
      totalCoef += subject.coef;
    });

    const average = totalCoef > 0 ? (totalWeightedGrade / totalCoef).toFixed(2) : 0;
    
    setResults({
      subjects: subjectResults,
      average: average,
      totalCoef: totalCoef
    });
  };

  useEffect(() => {
    calculateAverage();
  }, [grades]);

  const handleInputChange = (subject, type, value) => {
    if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 20)) {
      setGrades(prev => ({
        ...prev,
        [subject]: {
          ...prev[subject],
          [type]: value
        }
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-indigo-600">
              <LucideCalculator />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Calculateur de Moyenne - Semestre 3</h1>
          </div>

          <div className="space-y-6">
            {subjects.map((subject) => (
              <div key={subject.key} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                    <p className="text-sm text-gray-500">
                      {subject.ue} - Coefficient: {subject.coef}
                      {(subject.hasTD || subject.hasTP) && ' (Continu: 40%, Examen: 60%)'}
                    </p>
                  </div>
                  {results.subjects && results.subjects[subject.key] && (
                    <div className="text-right">
                      <span className="text-sm text-gray-500">Moyenne:</span>
                      <p className="text-xl font-bold text-indigo-600">{results.subjects[subject.key]}</p>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {subject.hasTD && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Note TD (/20)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.01"
                        value={grades[subject.key].td || ''}
                        onChange={(e) => handleInputChange(subject.key, 'td', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  )}
                  {subject.hasTP && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Note TP (/20)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.01"
                        value={grades[subject.key].tp || ''}
                        onChange={(e) => handleInputChange(subject.key, 'tp', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  )}
                  <div className={!subject.hasTD && !subject.hasTP ? 'col-span-3' : ''}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Note Examen (/20)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.01"
                      value={grades[subject.key].examen}
                      onChange={(e) => handleInputChange(subject.key, 'examen', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {results.average && (
            <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Moyenne Générale</h2>
                  <p className="text-indigo-100 mt-1">Total des coefficients: {results.totalCoef}</p>
                </div>
                <div className="text-right">
                  <p className="text-5xl font-bold">{results.average}</p>
                  <p className="text-indigo-100 mt-1">/20</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-indigo-400">
                <p className="text-sm text-indigo-100">
                  {parseFloat(results.average) >= 10 
                    ? '✓ Validé - Félicitations!' 
                    : '✗ Non validé - Il faut obtenir au moins 10/20'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Calculator />, document.getElementById('root'));