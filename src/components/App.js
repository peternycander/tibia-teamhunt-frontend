import React from 'react';
import Header from 'components/Header';
import WorldPicker from 'components/WorldPicker';
import LevelPicker from 'components/LevelPicker';
import PlayerList from 'components/PlayerList';
import InputState from 'components/StateProviders/InputState';
import OnlineListState from 'components/StateProviders/OnlineListState';
import BlacklistState from 'components/StateProviders/BlacklistState';
import GuildBlacklist from './GuildBlacklist';
import {Sidebar, Body, AppWrapper, SubHeader, FeedbackHint} from './styled';

const App = ({
  updateLevel,
  updateWorld,
  world,
  level,
  error,
  loading,
  onlineList,
  blacklist,
  addGuildToBlacklist,
  removeGuildFromBlacklist,
  loadPlayers,
  blacklistedGuilds
}) => (
  <AppWrapper>
    <Header>Tibia Teamhunt</Header>
    <Body>
      <SubHeader>Pick your world</SubHeader>
      <WorldPicker
        updateWorld={updateWorld}
        selectedWorld={world}
        loadPlayers={loadPlayers}
      />
      <LevelPicker updateLevel={updateLevel} level={level} />
      <PlayerList
        blacklist={blacklist}
        level={level}
        error={error}
        world={world}
        loading={loading}
        onlineList={onlineList}
        loadPlayers={loadPlayers}
      />
    </Body>
    <Sidebar>
      <GuildBlacklist
        world={world}
        addGuildToBlacklist={addGuildToBlacklist}
        removeGuildFromBlacklist={removeGuildFromBlacklist}
        blacklistedGuilds={blacklistedGuilds}
      />
    </Sidebar>
    <FeedbackHint>
      Made by{' '}
      <a target='_blank' rel='noopener noreferrer' href='https://www.peternycander.com'>Peter Nycander</a>
    </FeedbackHint>
  </AppWrapper>
);

export default () => (
  <InputState>
    {({updateLevel, updateWorld, state: {world, level}}) => (
      <BlacklistState>
        {({
          blacklist,
          addGuildToBlacklist,
          removeGuildFromBlacklist,
          blacklistedGuilds
        }) => (
          <OnlineListState>
            {({
              state: {error, loading, onlineList},
              actions: {loadPlayers}
            }) => (
              <App
                updateLevel={updateLevel}
                updateWorld={updateWorld}
                world={world}
                level={level}
                error={error}
                loading={loading}
                onlineList={onlineList}
                blacklist={blacklist}
                blacklistedGuilds={blacklistedGuilds}
                addGuildToBlacklist={addGuildToBlacklist}
                removeGuildFromBlacklist={removeGuildFromBlacklist}
                loadPlayers={loadPlayers}
              />
            )}
          </OnlineListState>
        )}
      </BlacklistState>
    )}
  </InputState>
);
