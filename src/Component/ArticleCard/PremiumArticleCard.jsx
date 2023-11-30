// PremiumArticleDetailsButton.jsx

import Button from '@mui/material/Button';

const PremiumArticleCard = ({ onClick, disabled }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
    >
      Premium Article Details
    </Button>
  );
};

export default PremiumArticleCard;
