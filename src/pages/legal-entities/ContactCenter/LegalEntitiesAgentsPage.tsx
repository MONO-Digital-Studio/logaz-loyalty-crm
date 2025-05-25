
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Filter } from 'lucide-react';
import AgentsList from '@/components/ContactCenter/AgentsList';
import AgentDetails from '@/components/ContactCenter/AgentDetails';
import { Agent } from '@/types/contactCenter';

// Временные моковые данные для операторов
const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Мария Иванова',
    status: 'online',
    activeDialogs: 2,
    skills: ['корпоративные продажи', 'B2B консультации', 'топливные карты'],
    avatar: 'https://i.pravatar.cc/100?img=1'
  },
  {
    id: '2',
    name: 'Александр Петров',
    status: 'busy',
    activeDialogs: 1,
    skills: ['технические вопросы', 'интеграции', 'API поддержка']
  },
  {
    id: '3',
    name: 'Екатерина Смирнова',
    status: 'offline',
    activeDialogs: 0,
    skills: ['платежи и счета', 'документооборот', 'юридические вопросы']
  },
  {
    id: '4',
    name: 'Дмитрий Козлов',
    status: 'online',
    activeDialogs: 3,
    skills: ['техподдержка', 'аналитика', 'отчетность']
  },
];

const LegalEntitiesAgentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agents] = useState<Agent[]>(mockAgents);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    const matchesSkill = skillFilter === 'all' || agent.skills.includes(skillFilter);
    
    return matchesSearch && matchesStatus && matchesSkill;
  });

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  const allSkills = Array.from(new Set(agents.flatMap(agent => agent.skills)));

  return (
    <div className="flex h-[calc(100vh-12rem)]">
      {/* Левая панель с фильтрами и списком операторов */}
      <div className="w-1/3 pr-4 flex flex-col">
        <Card className="mb-4">
          <CardContent className="pt-4">
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск операторов..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-1/2">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="online">Онлайн</SelectItem>
                  <SelectItem value="busy">Заняты</SelectItem>
                  <SelectItem value="offline">Оффлайн</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger className="w-1/2">
                  <SelectValue placeholder="Навык" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все навыки</SelectItem>
                  {allSkills.map(skill => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1 overflow-hidden">
          <CardHeader className="py-3 flex justify-between items-center">
            <CardTitle className="text-lg">
              Операторы ЮЛ
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({filteredAgents.length})
              </span>
            </CardTitle>
            <Button size="sm" className="bg-logaz-blue">
              <Plus className="h-4 w-4 mr-1" /> Добавить
            </Button>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-4rem)] overflow-y-auto">
            <AgentsList 
              agents={filteredAgents}
              selectedId={selectedAgent?.id}
              onSelectAgent={handleAgentSelect}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Правая панель с деталями оператора */}
      <div className="w-2/3 pl-4">
        {selectedAgent ? (
          <AgentDetails agent={selectedAgent} />
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center p-6">
              <div className="h-12 w-12 mx-auto text-muted-foreground mb-4 rounded-full bg-muted flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Выберите оператора</h3>
              <p className="text-muted-foreground">
                Выберите оператора из списка слева для просмотра деталей
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LegalEntitiesAgentsPage;
