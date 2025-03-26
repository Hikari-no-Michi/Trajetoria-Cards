'use client';
import React, { useEffect, useState } from 'react';
import { FaChartBar } from 'react-icons/fa';

type Disciplina = {
  nome: string;
  arquivo: string;
};

type ConteudoDisciplina = {
  pergunta: string;
  resposta: string;
};

const frasesMotivacionais = [
  'A vitória começa com o primeiro passo!',
  'O esforço de hoje é a conquista de amanhã.',
  'Você é mais forte do que imagina.',
  'O sucesso é a soma de pequenos esforços.',
  'O caminho é difícil, mas a vitória é doce.',
  'O único limite é o que você acredita ser.',
  'Transforme seus sonhos em planos.',
  'O trabalho duro traz resultados.',
  'Se você pode sonhar, você pode alcançar.',
  'Acredite em si mesmo e todo o resto virá.',
  'Nunca desista, o começo é sempre o mais difícil.',
  'A jornada é longa, mas cada passo vale a pena.',
  'O fracasso é apenas o começo do sucesso.',
  'Se você não tentar, nunca saberá do que é capaz.',
  'O futuro pertence àqueles que acreditam em seus sonhos.',
  'Sua única competição é você mesmo.',
  'Nada vem fácil, mas tudo vale a pena.',
  'A persistência transforma fracasso em sucesso.',
  'Hoje é o dia perfeito para começar.',
  'Acredite no seu potencial e vá além!',
];

const disciplinas: Disciplina[] = [
  { nome: 'Direito Constitucional', arquivo: 'constitucional.json' },
  { nome: 'Direito Administrativo', arquivo: 'administrativo.json' },
  { nome: 'Direito Penal', arquivo: 'penal.json' },
  { nome: 'Direito Processual Penal', arquivo: 'processual_penal.json' },
];

const TrajetoriaCards: React.FC = () => {
  const [showDisciplinas, setShowDisciplinas] = useState(false);
  const [mensagem, setMensagem] = useState<string>(''); // Ajustado o tipo para string
  const [selectedDisciplina, setSelectedDisciplina] =
    useState<Disciplina | null>(null);
  const [conteudoDisciplina, setConteudoDisciplina] =
    useState<ConteudoDisciplina | null>(null);
  const [mostrarPergunta, setMostrarPergunta] = useState(true);

  useEffect(() => {
    const fraseAleatoria =
      frasesMotivacionais[
        Math.floor(Math.random() * frasesMotivacionais.length)
      ];
    setMensagem(fraseAleatoria);
  }, []);

  const fetchConteudoDisciplina = async (arquivo: string) => {
    try {
      const response = await fetch(`/${arquivo}`);
      const data = await response.json();
      if (data.length > 0) {
        const conteudoAleatorio = data[Math.floor(Math.random() * data.length)];
        setConteudoDisciplina(conteudoAleatorio);
      }
    } catch (error) {
      console.error('Erro ao carregar o conteúdo da disciplina:', error);
    }
  };

  const handleSelectDisciplina = (disciplina: Disciplina) => {
    setSelectedDisciplina(disciplina);
    setShowDisciplinas(false);
    fetchConteudoDisciplina(disciplina.arquivo);
  };

  return (
    <div className="h-screen flex flex-col bg-[#e0f7fa]">
      <header className="w-full bg-[#4fc3f7] text-white p-4 flex justify-center items-center space-x-4 shadow-md">
        <button className="flex items-center bg-[#e0f7fa] text-[#0288d1] px-6 py-3 rounded-full shadow-md border-2 border-[#0288d1] hover:bg-[#b3e5fc] focus:outline-none">
          <FaChartBar className="mr-2" /> Estatísticas
        </button>
        <button
          className="bg-[#e0f7fa] text-[#0288d1] px-6 py-3 rounded-full shadow-md border-2 border-[#0288d1] hover:bg-[#b3e5fc] focus:outline-none"
          onClick={() => setShowDisciplinas(true)}
        >
          Disciplinas
        </button>
      </header>

      {showDisciplinas && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-white w-[400px] max-w-full rounded-lg p-6 shadow-xl h-[80%] mx-2 flex flex-col">
            <h2 className="text-2xl font-bold text-center text-[#0288d1] mb-4">
              Selecione uma disciplina
            </h2>
            <div className="flex-grow overflow-y-auto max-h-[400px]">
              {disciplinas.map((disciplina) => (
                <button
                  key={disciplina.nome}
                  onClick={() => handleSelectDisciplina(disciplina)}
                  className={`w-full text-left px-4 py-3 mb-2 rounded-md ${
                    selectedDisciplina?.nome === disciplina.nome
                      ? 'bg-pink-500 text-white'
                      : 'bg-[#e0f7fa] text-[#0288d1] hover:bg-[#0288d1] hover:text-white'
                  }`}
                >
                  {disciplina.nome}
                </button>
              ))}
            </div>
            <button
              className="w-full mt-4 bg-[#0288d1] text-white py-2 rounded-full"
              onClick={() => setShowDisciplinas(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-grow items-center justify-center py-6">
        <div
          onClick={() => setMostrarPergunta(!mostrarPergunta)} // Corrigido o onClick
          className="w-[500px] max-w-full mx-4 bg-white shadow-xl rounded-3xl flex flex-col items-center justify-center py-6 px-4 border-4 border-[#0288d1]
          h-[calc(100%-100px)]"
        >
          {conteudoDisciplina ? (
            <>
              {mostrarPergunta === false ? (
                <h2 className="text-2xl font-bold text-[#0288d1] text-center mb-4 transition-opacity duration-500 opacity-100">
                  {conteudoDisciplina.pergunta}
                </h2>
              ) : (
                <p className="text-lg text-center text-gray-700 transition-opacity duration-500 opacity-100">
                  {conteudoDisciplina.resposta}
                </p>
              )}
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-[#0288d1] text-center mb-6">
                {mensagem}
              </h2>
              {!showDisciplinas && (
                <button
                  className="bg-[#0288d1] text-white px-8 py-4 rounded-full shadow-lg border-2 border-[#0288d1] hover:bg-[#01579b] focus:outline-none"
                  onClick={() => setShowDisciplinas(true)}
                >
                  Vamos Começar ?
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrajetoriaCards;
