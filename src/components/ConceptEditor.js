import React, { useState } from 'react';
import { Button, View } from 'react-native';
import type { ConceptT } from '../constants/types';
import { useConceptTags, setConceptDeps } from '../hooks/concepts';
import { useNavigation } from '../hooks/navigation';
import { useSubscribedState } from '../hooks/helpers';
import ActionModal from './ActionModal';
import BrickItem from './BrickItem';

type Props = {
  concept?: ConceptT,
  show: boolean,
  onClose: () => void
};
function ConceptEditor(props: Props) {
  const { show, onClose } = props;
  const originalConcept = props.concept;
  const [localShow, setLocalShow] = useState(true);
  const taggedConcepts = useConceptTags(originalConcept);
  const [deps, setDeps] = useSubscribedState(taggedConcepts);
  const navigation = useNavigation();

  if (!originalConcept)
    return (
      <ActionModal
        show={show && localShow}
        onSubmit={concept =>
          BrickItem.defaultProps.onCreate(concept, navigation)
        }
        onClose={onClose}
        title="Nouveau concept"
        submitText="Créér"
      />
    );

  const onRemove = concept => {
    setDeps(deps.filter(d => d !== concept));
  };
  const onAdd = (concept, nav) => {
    setLocalShow(true);
    nav.pop();
    if (!deps.includes(concept)) setDeps([...deps, concept]);
  };
  const addDep = () => {
    setLocalShow(false);
    navigation.push('ConceptList', {
      title: `Lier ${originalConcept} à ...`,
      hideFAB: true,
      onSelect: onAdd,
      onCreate: onAdd
    });
  };

  return (
    <ActionModal
      show={show && localShow}
      onSubmit={concept =>
        setConceptDeps({ id: originalConcept, name: concept, deps })
      }
      onClose={onClose}
      title="Editer le concept"
      submitText="Éditer"
      defaultValue={originalConcept}
      noCheck
    >
      <View>
        {deps.map(concept => (
          <BrickItem
            key={concept}
            concept={concept}
            onRemove={onRemove}
            asConcept
          />
        ))}
      </View>
      <View>
        <Button title="Ajouter" onPress={addDep} />
      </View>
    </ActionModal>
  );
}

ConceptEditor.defaultProps = { concept: null };
export default ConceptEditor;
