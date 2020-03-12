import pandas as pd
import sys
import json
import os
import shutil

# fields = sys.argv[1]
# fields = json.loads(fields)


def response():
    df = pd.read_csv("full_dt_pf.csv")
    orientation_group = df.groupby("humanmade_pass")
    pass_df = orientation_group.get_group(1)
    fail_df = orientation_group.get_group(0)
    print(type(fail_df))

# response()


def test(fields):
    if os.path.isdir("output"):
        os.removedirs("output")

    os.makedir("output")


# print(response(fields))
sys.stdout.flush()
