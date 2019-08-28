const globalShortcut = (inputDocumentRef, form, entrances, selectEntrance) => {
  const generateEntranceId = id => {
    return `ENTRANCE_${id}`;
  };

  return [
    {
      id: `GO_TO_DOCUMENT`,
      keys: ["ctrl", "1"],
      callback: () => {
        inputDocumentRef.focus();
        form.setFieldsValue({ "customer.document": "" });
      }
    },
    ...entrances.map((entrance, index) => {
      return {
        id: generateEntranceId(entrance.id),
        keys: ["shift", `${index + 1}`],
        callback: () => {
          selectEntrance(entrance.id);
        }
      };
    })
  ];
};

const genderShortcut = form => {
  return [
    {
      id: `SELECT_M`,
      keys: ["1"],
      callback: () => {
        form.setFieldsValue({ "customer.gender": "M" });
      }
    },
    {
      id: `SELECT_F`,
      keys: ["2"],
      callback: () => {
        form.setFieldsValue({ "customer.gender": "F" });
      }
    }
  ];
};

const generateShortcuts = (
  inputDocumentRef,
  form,
  entrances,
  selectEntrance
) => {
  return {
    globalShortcuts: globalShortcut(
      inputDocumentRef,
      form,
      entrances,
      selectEntrance
    ),
    genderShortcuts: genderShortcut(form)
  };
};

export default generateShortcuts;
