import { useGetTagsListQuery } from '@slice/services';

export const useSelectFeedbacktag = () => {
    const { data: tags, isSuccess: isTagsListReceived } = useGetTagsListQuery({});

    const tagsList = isTagsListReceived
        ? [
              ...tags.map((tag: any) => {
                  return { value: tag.feedbackTypeId, label: tag.feedbackType };
              })
          ]
        : [];

    return { tagsList };
};
