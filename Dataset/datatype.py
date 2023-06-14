import pandas as pd

print("Artists")
df=pd.read_csv('C:/Users/struckthunder/Desktop/collection/Artists.csv')

for column in df.columns:

    # Check if all rows in the column are filled or not
    if df[column].isnull().any():
        print(f"'{column}' At least 1 Unfilled Rows")
    else:
        print(f"'{column}' All Rows Filled")


#dataType=df.dtypes

# for column, datatType in dataType.items():
#     print(f"columb '{column}' : '{dataType}'")

print("***Artworks***")
df=pd.read_csv('C:/Users/struckthunder/Desktop/collection/Artworks.csv')

for column in df.columns:

    # Check if all rows in the column are filled or not
    if df[column].isnull().any():
        print(f"'{column}' At least 1 Unfilled Rows")
    else:
        print(f"'{column}' All Rows Filled")



# for column, datatType in dataType.items():
#     print(f"columb '{column}' : '{dataType}'")

    