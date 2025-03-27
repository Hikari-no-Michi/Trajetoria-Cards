'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faBook,
  faClipboardList,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';

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

export default function FlashcardApp() {
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
    fetchConteudoDisciplina(disciplina.arquivo);
  };

  return (
    <div className="h-screen w-full bg-sky-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-sky-600 text-white p-4 shadow-md flex flex-col items-center">
        <h1 className="text-base font-semibold">
          Lei Seca | Lei de Registros Públicos
        </h1>
        <div className="w-full flex justify-between mt-2 max-w-lg">
          <button className="flex-1 bg-sky-500 p-2 mx-0.5 rounded-md flex flex-col items-center justify-center text-sm">
            <FontAwesomeIcon icon={faChartBar} className="w-6 h-6 mb-1" />
            <span>Estatísticas</span>
          </button>
          <button
            onClick={() => setShowDisciplinas(true)}
            className="flex-1 bg-sky-500 p-2 mx-0.5 rounded-md flex flex-col items-center justify-center text-sm"
          >
            <FontAwesomeIcon icon={faBook} className="w-6 h-6 mb-1" />
            <span>Disciplina</span>
          </button>
          <button className="flex-1 bg-sky-500 p-2 mx-0.5 rounded-md flex flex-col items-center justify-center text-sm">
            <FontAwesomeIcon icon={faClipboardList} className="w-6 h-6 mb-1" />
            <span>Revisão</span>
          </button>
        </div>
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

      {/* Search Bar */}
      <div className="w-full max-w-lg mt-4 px-2 sm:px-0">
        <input
          type="text"
          placeholder="Pesquisar card"
          className="w-full p-2 border border-sky-400 rounded-md"
        />
      </div>

      {/* Flashcard */}
      <div className="w-full max-w-lg mt-4 px-2 sm:px-0">
        <div
          onClick={() => setMostrarPergunta(!mostrarPergunta)}
          className="bg-white p-2 rounded-lg shadow-md text-center sm:h-[300px] h-[250px]"
        >
          {conteudoDisciplina ? (
            <>
              {mostrarPergunta === false ? (
                <h2 className="text-2xl font-bold text-[#0288d1] text-center mb-4 transition-opacity duration-500 opacity-100 flex items-center justify-center h-full">
                  {conteudoDisciplina.pergunta}
                </h2>
              ) : (
                <p className="text-lg text-center text-gray-700 transition-opacity duration-500 opacity-100 flex items-center justify-center h-full px-4">
                  {conteudoDisciplina.resposta}
                </p>
              )}
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#0288d1] text-center mb-2 py-6 px-2 md:text-3xl md:px-3 lg:text-3xl lg:px-5">
                {mensagem}
              </h2>
              {!showDisciplinas && (
                <button
                  className="bg-[#0288d1] text-white px-8 py-3 rounded-full shadow-lg border-2 border-[#0288d1] hover:bg-[#01579b] focus:outline-none"
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
}
