import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { ConceptT } from '../constants/types';
import { useConceptTags, setConceptDeps } from '../hooks/concepts';
import { useNavigation, NavigationProp } from '../hooks/navigation';
import { useSubscribedState } from '../hooks/helpers';
import ActionModal from './ActionModal';
import ConceptItem from './ConceptItem';

type Props = {
  concept: ConceptT | null;
  show: boolean;
  onClose: () => void;
};
function ConceptEditor(props: Props) {
  const { show, onClose } = props;
  const originalConcept = props.concept;
  const [localShow, setLocalShow] = useState(true);
  const taggedConcepts = useConceptTags(originalConcept);
  const [deps, setDeps] = useSubscribedState(taggedConcepts);
  const navigation = useNavigation();

  if (!originalConcept) {
    return (
      <ActionModal
        show={show && localShow}
        onSubmit={(concept: ConceptT) =>
          ConceptItem.defaultProps.onCreate(concept, navigation)
        }
        onClose={onClose}
        title="Nouveau concept"
        submitText="Créér"
      />
    );
  }

  const onRemove = (concept: ConceptT) => {
    setDeps(deps.filter(dep => dep !== concept));
  };
  const onAdd = (concept: ConceptT, nav: NavigationProp) => {
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
      onCreate: onAdd,
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
          <ConceptItem
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
